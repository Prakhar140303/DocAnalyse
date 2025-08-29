import express from "express";
import multer from "multer";
import Tesseract from "tesseract.js";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import pdf from "pdf-poppler";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

const app = express();


const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const __filename = fileURLToPath(import.meta.url);
const uploadsDir = path.join(process.cwd(), "backend", "uploads");

if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const upload = multer({ dest: uploadsDir });

export const documentUpload = async (req, res) => {
  try {
    const file = req.file;

    if (!file) return res.status(400).send("No file uploaded");

    let texts = [];

    if (file.mimetype.startsWith("image/")) {
      const result = await Tesseract.recognize(file.path, "eng");
      texts.push(result.data.text);
    } else if (file.mimetype === "application/pdf") {
      const outputPrefix = path.join(uploadsDir, Date.now().toString());

      await pdf.convert(file.path, {
        format: "jpeg",
        out_dir: path.dirname(outputPrefix),
        out_prefix: path.basename(outputPrefix),
        page: null,
      });

      let page = 1;
      while (true) {
        const imagePath = `${outputPrefix}-${page}.jpg`;
        if (!fs.existsSync(imagePath)) break;

        const result = await Tesseract.recognize(imagePath, "eng");
        texts.push(result.data.text);

        fs.unlink(imagePath, () => {});
        page++;
      }
    } else {
      return res.status(400).send("Only images or PDFs allowed");
    }

    fs.unlink(file.path, () => {});

    res.json({ success: true, data: texts.join("\n\n") });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Error processing file" });
  }
};

export const handleGenerate = async (req, res) => {
  try {
    console.log("hit backend");
    const { text, length, tone } = req.body;
    console.log(req.body);

    const prompt = `Summarize the following text into a plain list of points.
Rules:
- Do NOT return JSON, arrays, or objects.
- Do NOT use Markdown (no *, no **, no -, no numbering).
- Just output each point on a new line as plain text.
- Keep the tone: ${tone}
- Length: ${length}

Text:
"""${text}"""`;

    const result = await model.generateContent(prompt);
    let rawOutput = result.response.text().trim();
    
    rawOutput = rawOutput.replace(/```json|```/g, "").trim();


    const summaryPoints = rawOutput
      .split("\n")
      .map(line => line.trim())
      .filter(line => line.length > 0);

    console.log("Summary:", summaryPoints);

    res.status(200).json({ success: true, data: summaryPoints });
  } catch (err) {
    console.error("Error generating summary:", err);
    res.status(500).json({
      success: false,
      data: "Failed to generate summary",
    });
  }
};

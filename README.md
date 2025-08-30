# DocSummarizer

DocSummarizer is a full-stack web application that allows users to upload PDF or image documents, extract text, and generate concise summaries with selectable tone and length. Built with React (frontend) and Node.js/Express (backend), it leverages Google Generative AI for advanced summarization.

## Features

- **Upload Documents:** Drag & drop or select PDFs, PNGs, or JPGs (up to 10MB).
- **Extract Text:** Automatically extract text from uploaded documents using OCR (Tesseract.js for images, pdf-parse for PDFs).
- **Generate Summary:** Create plain-text summaries with customizable tone (Neutral, Formal, Casual) and length (Short, Medium, Long).
- **Export & Share:** Copy or download summaries instantly.
- **Recent Summaries:** View and expand previously generated summaries in a modal.

## Tech Stack

- **Frontend:** React, Vite, TailwindCSS
- **Backend:** Node.js, Express, Multer, Tesseract.js, pdf-parse
- **AI:** Google Generative AI (Gemini)
- **Other:** Docker (optional), sessionStorage for recent summaries

## Live Demo

Access the deployed app at:  
[https://docanalyse.onrender.com/](https://docanalyse.onrender.com/)

## Getting Started

### Prerequisites

- Node.js & npm
- Google Generative AI API Key (Gemini)
- Docker (optional)

### Installation

#### 1. Clone the repository

```sh
git clone https://github.com/Prakhar140303/DocAnalyse.git
cd DocAnalyse
```

#### 2. Install dependencies and build

You do **not** need to enter the frontend or backend folders separately.  
Just run the following commands from the root folder:

```sh
npm install
npm run build
```

#### 3. Add your Gemini API key

```sh
echo "GEMINI_API_KEY=your_api_key_here" > backend/.env
```

### Running the App

#### Development Mode

- Run the frontend in development mode:
  ```sh
  cd frontend
  npm run dev
  ```
- Run the backend in development mode:
  ```sh
  cd backend
  npm run dev
  ```
- Open [http://localhost:5173](http://localhost:5173) in your browser.

#### Production/Build Mode

- From the root folder, start the backend server (which serves the built frontend):
  ```sh
  npm start
  ```
- Open [http://localhost:5001](http://localhost:5001) in your browser.

#### Access the Deployed App

You can use the app directly at:  
[https://docanalyse.onrender.com/](https://docanalyse.onrender.com/)

### Docker (Optional)

Build and run with Docker:

```sh
docker build -t docsummarizer .
docker run -p 5000:5000 -p 5001:5001 docsummarizer
```

## Usage

1. Upload a PDF or image.
2. Extract text from the document.
3. Select summary tone and length.
4. Generate, copy, or export your summary.
5. View recent summaries in the workspace.

## Project Structure

```
DocSummarizer/
├── backend/
│   ├── .env                        # Environment variables (API keys, config)
│   ├── .gitignore                  # Files/folders to ignore in git
│   ├── eng.traineddata             # Tesseract OCR language data file
│   ├── package.json                # Backend dependencies and scripts
│   ├── server.js                   # Entry point for Express server
│   ├── controllers/
│   │   └── documentController.js   # Handles document upload & text extraction logic
│   ├── routers/
│   │   └── document.routes.js      # Defines API routes for document operations
│   ├── test/
│   │   └── data/
│   │       ├── 05-versions-space.pdf      # Sample PDF for testing
│   │       └── 05-versions-space.pdf.txt  # Extracted text from sample PDF
│   ├── uploads/                    # Stores uploaded files
│
├── frontend/
│   ├── package.json                # Frontend dependencies and scripts
│   ├── public/
│   │   └── index.html              # HTML template for React app
│   ├── src/
│   │   ├── App.jsx                 # Root React component, sets up routing/layout
│   │   ├── main.jsx                # Entry point for React app
│   │   ├── index.css               # Global styles
│   │   ├── Components/
│   │   │   ├── Header.jsx          # Top navigation/header bar component
│   │   │   ├── Home.jsx            # Main UI for uploading, extracting, and summarizing documents
│   │   │   ├── LandingPage.jsx     # Landing page component (welcome/info)
│   │   │   ├── Recent.jsx          # Displays recent summaries
│   │   │   └── Sidebar.jsx         # Sidebar navigation/menu component
│   │   └── utils/
│   │       └── axiosInstance.js    # Configured Axios instance for API requests
│   ├── tailwind.config.js          # TailwindCSS configuration
│
├── package.json                    # Root scripts for install/build/start
├── README.md                       # Project documentation
└── .gitignore                      # Files/folders to ignore in git (root)
```

### Key Files & Folders

- **backend/controllers/**: Business logic for summarization and extraction.
- **backend/routers/**: API endpoints for document upload and summary generation.
- **backend/test/**: Sample data and extracted text for backend testing.
- **backend/uploads/**: Stores uploaded files.
- **frontend/src/Components/**: React components for UI (upload, summary, modals, navigation).
  - `Header.jsx`: Top navigation/header bar component.
  - `Home.jsx`: Main UI for uploading, extracting, and summarizing documents.
  - `LandingPage.jsx`: Landing page component (welcome/info).
  - `Recent.jsx`: Displays recent summaries.
  - `Sidebar.jsx`: Sidebar navigation/menu component.
- **frontend/src/utils/**: Axios instance for HTTP requests.
- **frontend/public/**: Static assets and HTML template.



## Contact / Author

**Your Name**  
GitHub: [Prakhar140303](https://github.com/Prakhar140303)  
Email: prakharsingh1303303@gmail.com  

If you’d like to report issues or request features, please open an issue on the GitHub repository:  
https://github.com/Prakhar140303/DocAnalyse/issues


---

© 2025 DocSummarizer. All rights reserved.

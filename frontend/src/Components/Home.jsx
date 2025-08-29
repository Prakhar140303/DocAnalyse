import React, { useState } from 'react'
import { FolderUp, UploadCloud, FileText, Copy, Download, Sparkles, Expand } from 'lucide-react'
import axiosInstance from '../utils/axiosInstance'
import toast from 'react-hot-toast'

function Home() {
  const [file, setFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [length, setLength] = useState('Short');
  const [tone, setTone] = useState('Neutral');
  const [loaded, setLoaded] = useState(false);
  const [extractedText, setExtractedText] = useState('');
  const [loading, setLoading] = useState(false);
  const [extractedTextModalOpen, setExtractedTextModalOpen] = useState(false);
  const [summaryModalOpen, setSummaryModalOpen] = useState(false);
  const [summary, setSummary] = useState([]);
  const [generating, setGenerating] = useState(false);

  const handleFile = (e) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) setFile(selectedFile);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files?.[0];
    if (droppedFile) setFile(droppedFile);
  };

  const handleExtract = async () => {
    if (!file) return;
    setLoading(true);
    setExtractedText('');
    try {
      const formData = new FormData();
      formData.append('file', file);

      const res = await axiosInstance.post('/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setExtractedText(res.data.data || 'No text found');
      setLoaded(true);
    } catch (err) {
      console.error(err);
      setExtractedText('Error extracting text. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleGenerate = async () => {
    if (!extractedText) return;
    setGenerating(true);

    try {
      const res = await axiosInstance.post('/summarize', {
        text: extractedText,
        length,
        tone,
      });

      const newSummary = res.data?.data || [];
      setSummary(newSummary);

      const newSummaryObj = {
        summary: newSummary,
        tone,
        length,
        timestamp: new Date().toISOString(),
      };

      const storedSummaries = sessionStorage.getItem("summaries");
      let updatedSummaries = [];
      if (storedSummaries) {
        try {
          updatedSummaries = JSON.parse(storedSummaries);
        } catch {
          updatedSummaries = [];
        }
      }
      updatedSummaries.push(newSummaryObj);
      sessionStorage.setItem("summaries", JSON.stringify(updatedSummaries));
    } catch (err) {
      console.error(err);
      setSummary(["Failed to generate summary"]);
    } finally {
      setGenerating(false);
    }
  };

  // helper to show preview text
  const getPreviewText = (text) => {
    const MAX_LENGTH = 550;
    if (!text) return "Extracted Text will be visible here";
    if (text.length <= MAX_LENGTH) return text;
    return text.slice(0, MAX_LENGTH) + " . . . . .";
  };

// copying to clip board
const handleCopySummary = () => {
  if (summary.length === 0) {
    toast.error("No summary to copy!");
    return;
  }

  const textToCopy = summary.join('\n');
  navigator.clipboard.writeText(textToCopy)
    .then(() => {
      toast.success("Summary copied to clipboard!");
    })
    .catch((err) => {
      console.error("Failed to copy: ", err);
      toast.error("Failed to copy summary.");
    });
};

// handles the export of summary by creating a txt file and then appending the summary to it
const handleExportSummary = () => {
  if (summary.length === 0) {
    toast.error("No summary to export!");
    return;
  }
  const textToExport = summary.join('\n');
  const blob = new Blob([textToExport], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = url;
  link.download = `${file?.name?.split('.')[0] || 'summary'}.txt`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);

  toast.success("Summary exported successfully!");
};

  return (
    <div className='flex md:flex-row flex-col gap-4 w-full rounded-lg h-full' >
      {/* Extracted Text Modal */}
      {extractedTextModalOpen && extractedText && (
        <div className="modal p-[10vw] cursor-pointer" onClick={() => setExtractedTextModalOpen(false)}>
          <div
            className="bg-gray-200 flex justify-center md:min-w-[50vw] md:min-h-[50vh] min-w-[80vw] min-h-[60vh] items-center p-4 gap-2 rounded-2xl flex-col "
            onClick={(e) => e.stopPropagation()}>
            <h1 className="text-2xl font-semibold">Extracted Text</h1>

            <textarea
              className="p-2 w-full h-[40vh] rounded-2xl bg-white"
              value={extractedText}
              onChange={(e) => setExtractedText(e.target.value)}
            />

            <button
              className="bg-primary text-white px-4 py-2 rounded-lg shadow selected-hover transition"
              onClick={() => setExtractedTextModalOpen(false)}>
              Save
            </button>
          </div>
        </div>
      )}

      {/* Summary Modal */}
      {summaryModalOpen && summary.length > 0 && (
        <div className="modal p-[10vw] cursor-pointer" onClick={() => setSummaryModalOpen(false)}>
          <div
            className="bg-gray-200 flex flex-col md:min-w-[50vw] md:min-h-[50vh] min-w-[80vw] min-h-[60vh] max-h-[80vh] p-4 gap-4 rounded-2xl"
            onClick={(e) => e.stopPropagation()}>
            <h1 className="text-2xl font-semibold">Generated Summary</h1>

            <div className="bg-white w-full h-[40vh] p-3 rounded-xl overflow-y-auto shadow-inner">
              <ul className="list-disc pl-5 text-gray-700 space-y-1">
                {summary.map((point, i) => (
                  <li key={i}>{point}</li>
                ))}
              </ul>
            </div>

            <button
              className="bg-primary text-white px-4 py-2 rounded-lg shadow selected-hover transition self-end"
              onClick={() => setSummaryModalOpen(false)}>
              Close
            </button>
          </div>
        </div>
      )}

      {/* column 1 */}
      <div className='flex-[4] flex flex-col h-full p-2 gap-4 rounded-3xl bg-white'>
        <h1 className='text-xl font-semibold text-black p-1'>Upload Document</h1>
        <label
          onDragOver={(e) => {
            e.preventDefault()
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          className={`flex flex-col p-3 justify-center items-center rounded-lg cursor-pointer transition 
            ${isDragging ? 'bg-primary-dark text-white' : 'bg-primary-light'}
          `}
        >
          <FolderUp className="size-12" />
          {!file ? (
            <div className='flex flex-col gap-2'>
              <span className='font-semibold opacity-75 text-lg'>
                Drag and drop PDF or image here
              </span>
              <span className='opacity-65 text-black'>Supported: PDF, PNG, JPG, Max 10MB</span>
              <div className='flex gap-2 justify-center bg-primary p-2 rounded text-white'>
                <UploadCloud />
                <span className='text-lg'>Choose File</span>
              </div>
            </div>
          ) : (
            <span>{`Selected: ${file?.name}`}</span>
          )}
          <input
            type="file"
            className="hidden"
            accept="application/pdf,image/*"
            onChange={handleFile}
          />
        </label>

        <div className='flex gap-4'>
          <div className='flex-[3] flex flex-col gap-4'>
            {/* Summary Length */}
            <div className='flex bg-primary-light p-1 py-2 rounded-lg gap-4 items-center'>
              <span>Summary Length</span>
              <div className='bg-white rounded-3xl flex gap-4 p-1'>
                {['Short', 'Medium', 'Long'].map((l) => (
                  <div
                    key={l}
                    className={`font-semibold rounded-3xl cursor-pointer p-2 transition-all duration-300 ease-in-out ${length === l ? 'selected' : ''}`}
                    onClick={() => setLength(l)}
                  >
                    <span>{l}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tone */}
            <div className='flex bg-primary-light p-1 py-2 rounded-lg gap-4 items-center'>
              <span>Tone</span>
              <div className='bg-white rounded-3xl flex gap-4 p-1'>
                {['Neutral', 'Formal', 'Casual'].map((t) => (
                  <div
                    key={t}
                    className={`font-semibold rounded-3xl cursor-pointer p-2 transition-all duration-300 ease-in-out ${tone === t ? 'selected' : ''}`}
                    onClick={() => setTone(t)}
                  >
                    <span>{t}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className='flex-[1]'>
            <button
              className='p-2 selected-hover bg-primary text-white disabled:opacity-50 disabled:cursor-not-allowed'
              disabled={!file || loading}
              onClick={handleExtract}
            >
              {loading ? 'Extracting...' : 'Extract Text'}
            </button>
          </div>
        </div>
          {extractedText &&
            <div className='flex w-full justify-end p-2 px-4 '>
              <button onClick={() => setExtractedTextModalOpen(true)}><Expand /></button>
            </div>
           }
        <div
          className='min-h-[30vh] max-h-[40vh] w-full border-b rounded-2xl px-4 py-2 bg-gray-200 md:overflow-hidden cursor-pointer'
          onClick={() => setExtractedTextModalOpen(true)}
        >
          <span>{loading ? 'Processing...' : getPreviewText(extractedText)}</span>
        </div>
      </div>

      {/* column 2 */}
      <div className='flex-[3] flex flex-col h-full p-2 gap-4 rounded-lg bg-white'>
        <div className="flex items-center justify-between border-b pb-2 mb-4">
          <div className="flex items-center gap-2 text-gray-700">
            <FileText className="w-5 h-5" />
            <span className="font-medium">{loaded ? file?.name : 'No document loaded'}</span>
          </div>
          <div className="flex gap-2">
            <button className="p-2 rounded-lg flex items-center gap-2 bg-primary-light selected-hover"
                onClick={handleCopySummary}>
              <Copy className="w-5 h-5 " />
              <span>Copy</span>
            </button>
            <button className="p-2 rounded-lg flex items-center gap-2 selected-hover bg-primary text-white"
             onClick={handleExportSummary}>
              <Download className="w-5 h-5 " />
              <span>Export</span>
            </button>
          </div>
        </div>

        <div className='w-full flex justify-end px-3 '>
          <div className='bg-primary text-white flex items-center p-2 gap-2 selected-hover 'onClick={handleGenerate} disabled={generating}>
            <Sparkles />
            <button className='text-md font-semibold ' >
              {generating ? "Generating..." : "Generate summary"}
            </button>
          </div>
        </div>

        {/* Summary section */}
        

        {summary.length > 0 ? (
          <div>
            <div className='flex w-full justify-end p-2 px-4'>
              
              <button onClick={() => setSummaryModalOpen(true)}><Expand /></button>
            </div>
            <div
              className="bg-white shadow-md rounded-2xl p-4 border border-gray-200 hover:shadow-lg transition cursor-pointer"
              onClick={() => setSummaryModalOpen(true)}
            >
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-400"></span>
                <span className="text-xs px-2 py-1 rounded bg-primary-extralight text-primary-dark">
                  {tone} • {length}
                </span>
              </div>

              <ul className="list-disc pl-5 text-gray-700 space-y-1 line-clamp-[10]">
                {summary.map((point, i) => (
                  <li key={i}>{point}</li>
                ))}
              </ul>
              <p className="text-blue-500 text-xs mt-2">Click to expand →</p>
            </div>
          </div>): <div className="bg-amber-50 border-l-4 border-amber-400 p-3 rounded-md mb-4">
          <p className="text-amber-800 font-semibold">Summary:</p>
          <p className="text-amber-900">Upload a PDF or image to generate a summary.</p>
        </div>
        }
      </div>
    </div>
  )
}

export default Home

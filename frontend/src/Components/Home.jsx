import React, { useState } from 'react'
import { FolderUp, UploadCloud, FileText, Copy, Download, Sparkles } from 'lucide-react'
import axiosInstance from '../utils/axiosInstance'

function Home() {
  const [file, setFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [length, setLength] = useState('Short');
  const [tone, setTone] = useState('Neutral');
  const [loaded, setLoaded] = useState(false);
  const [extractedText, setExtractedText] = useState('');
  const [loading, setLoading] = useState(false);
  const [extractedTextModalOpen,setExtractedTextModalOpen] = useState(false);
  const [summary, setSummary] = useState([]); // ✅ store summary points
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



  return (
    <div className='flex gap-4 w-full rounded-lg h-full' >
      {/* Modal */}
      {extractedTextModalOpen && (
        <div className='modal p-[10vw] cursor-pointer ' onClick={()=>setExtractedTextModalOpen(false)}>
          <div className='bg-white flex justify-center items-center p-4 gap-2 rounded-2xl flex-col' onClick={(e)=>e.stopPropagation()}>
            <h1 className='text-2xl  font-semibold'>Extracted Text</h1>
            <p className='p-2 border-1 border-black rounded-2xl shadow-2xl shadow-black'>
              {extractedText}
            </p>
          </div>
        </div>
      )}

      {/* column 1 */}
      <div className='flex-[4] flex flex-col h-full p-2 gap-4 rounded-3xl bg-white'>
        <h1 className='text-xl font-semibold text-black p-4'>Upload Document</h1>
        <label
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          className={`flex flex-col p-6 justify-center items-center rounded-lg cursor-pointer transition 
            ${isDragging ? 'bg-primary-dark text-white' : 'bg-primary-light'}
          `}
        >
          <FolderUp className="size-16" />
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
            <div className='flex bg-primary-light p-2 py-4 rounded-lg gap-4 items-center'>
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
            <div className='flex bg-primary-light p-2 py-4 rounded-lg gap-4 items-center'>
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

        <h1 className=''>Extracted Text</h1>
        <div 
          className='min-h-[30vh] w-full border-b rounded-2xl px-4 py-2 bg-gray-200 overflow-hidden cursor-pointer' 
          onClick={()=> setExtractedTextModalOpen(true)}
        >
          <span>{loading ? 'Processing...' : extractedText || 'Extracted Text will be visible here'}</span>
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
            <button className="p-2 rounded-lg flex items-center gap-2 bg-primary-light selected-hover">
              <Copy className="w-5 h-5 " />
              <span>Copy</span>
            </button>
            <button className="p-2 rounded-lg flex items-center gap-2 selected-hover bg-primary text-white">
              <Download className="w-5 h-5 " />
              <span>Export</span>
            </button>
          </div>
        </div>

        <div className='w-full flex justify-end px-3 '>
          <div className='bg-primary text-white flex items-center p-2 gap-2 selected-hover '>
            <Sparkles />
            <button className='text-md font-semibold ' onClick={handleGenerate} disabled={generating}>
              {generating ? "Generating..." : "Generate summary"}
            </button>
          </div>
        </div>

        {/* Summary section */}
        <div className="bg-amber-50 border-l-4 border-amber-400 p-3 rounded-md mb-4">
          <p className="text-amber-800 font-semibold">Summary:</p>
          {summary.length > 0 ? (
            <ul className="list-disc pl-5 text-amber-900">
              {summary.map((point, idx) => (
                <li key={idx}>{point}</li>
              ))}
            </ul>
          ) : (
            <p className="text-amber-900">Upload a PDF or image to generate a summary.</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default Home;

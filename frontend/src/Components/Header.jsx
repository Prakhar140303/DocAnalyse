import React, { useState } from 'react';
import { BadgeQuestionMark, Upload, X } from 'lucide-react';
import {useNavigate} from 'react-router-dom' 
function Header() {
  const [helpModalOpen, setHelpModalOpen] = useState(false);
  const navigate = useNavigate();
  return (
    <div>

      <div className='w-full flex gap-4 justify-end p-2'>
        <div
          className='flex gap-2 p-2 rounded-lg bg-primary/20 cursor-pointer hover:bg-primary/30 transition'
          onClick={() => setHelpModalOpen(true)}
        >
          <BadgeQuestionMark />
          Help
        </div>

        {/* Upload Button */}
        <div className='flex gap-2 p-2 rounded-lg bg-primary text-white selected-hover cursor-pointer'
          onClick ={()=> {navigate('/home')}}>
          <Upload />
          Upload
        </div>
      </div>

      {helpModalOpen && (
        <div
          className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 cursor-pointer'
          onClick={() => setHelpModalOpen(false)}
        >
          <div
            className='bg-white rounded-2xl p-6 md:min-w-[40vw] min-w-[70vw] max-h-[70vh] overflow-y-auto flex flex-col gap-4'
            onClick={(e) => e.stopPropagation()}
          >
            <div className='flex justify-between items-center'>
              <h2 className='text-2xl font-semibold'>Help</h2>
              <button
                className='p-1 rounded-full hover:bg-gray-200 transition'
                onClick={() => setHelpModalOpen(false)}>
                <X />
              </button>
            </div>

            <div className='text-gray-700'>
              <p className='mb-2'>
                Welcome to DocSummarizer! Here's how you can use the app:
              </p>
              <ul className='list-disc pl-5 space-y-2'>
                <li>Upload PDFs or images (PNG/JPG) up to 10MB.</li>
                <li>Extract text from your document instantly.</li>
                <li>Generate summaries with selectable tone and length.</li>
                <li>Copy or download your summaries.</li>
                <li>Click on any summary to view it in a detailed modal.</li>
              </ul>
            </div>

            <div className='flex justify-end mt-4'>
              <button
                className='bg-primary text-white px-4 py-2 rounded-lg shadow hover:bg-primary-dark transition'
                onClick={() => setHelpModalOpen(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Header;

import React from 'react'
import { Files, House, Clock, Sparkles } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

function Sidebar({ isOpen, toggleSidebar }) {
  const navigate = useNavigate()

  const handleNav = (path) => {
    navigate(path)
    toggleSidebar()
  }

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={toggleSidebar}
        />
      )}

      <div
        className={`fixed top-0 left-0 h-full w-64 bg-primary-light px-4 flex flex-col justify-between z-50 transform transition-transform duration-300 
        ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}
      >
        <div>
          <div
            className="flex items-center gap-3 p-4 border-b text-primary-dark font-bold cursor-pointer"
            onClick={() => handleNav('/')}
          >
            <Files />
            <h1 className="text-xl">Summarizer Assistant</h1>
          </div>

          <h2 className="opacity-45 my-4">Workspace</h2>

          <div className="flex flex-col gap-[1vh] py-4">
            <div
              className="flex gap-3 p-4 text-lg text-primary-dark border-b selected-hover cursor-pointer"
              onClick={() => handleNav('/home')}
            >
              <House />
              <span>Home</span>
            </div>
            <div
              className="flex gap-3 p-4 text-lg border-b rounded-xl selected-hover cursor-pointer"
              onClick={() => handleNav('/recent')}
            >
              <Clock />
              <span>Recent</span>
            </div>
          </div>

          <h2 className="opacity-45 my-4">Shortcuts</h2>

          <div
            className="flex gap-3 p-4 text-lg border-b text-primary-dark selected-hover cursor-pointer"
            onClick={() => handleNav('/new-summary')}
          >
            <Sparkles />
            <span>New Summary</span>
          </div>
        </div>
      </div>
    </>
  )
}

export default Sidebar

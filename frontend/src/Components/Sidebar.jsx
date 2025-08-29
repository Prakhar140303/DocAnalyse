import React from 'react'
import { Files,House, Clock ,Sparkles,User} from 'lucide-react';
import {useNavigate} from 'react-router-dom'
function Sidebar() {
    const navigate= useNavigate();
  return (
    <div className='bg-primary-light h-full px-4 flex flex-col justify-between'>
        <div className=''>

            <div className='flex items-center gap-3 p-4  border-b  text-primary-dark font-bold cursor-pointer' onClick={()=>navigate('/')}>
                <Files />
                <h1 className='text-xl '> Summarizer Assistant </h1>
            </div>

            <h2 className='opacity-45 my-4'>Workspace</h2>

            <div className='flex flex-col gap-[1vh] py-4'>
                <div className='flex  gap-3 p-4 text-lg text-primary-dark border-b selected-hover' onClick={()=>{navigate('/home')}}>
                    <House />
                    <span>Home</span>
                </div>
                <div className='flex  gap-3 p-4 text-lg border-b rounded-xl  selected-hover' onClick={()=>{navigate('/recent')}}>
                    <Clock />
                    <span>Recent</span>
                </div>
            </div>

            <h2 className='opacity-45 my-4'>Shortcuts</h2>
        
            <div className='flex  gap-3 p-4 text-lg border-b  text-primary-dark selected-hover'>
                    <Sparkles />
                    <span>New Summary</span>
                </div>
        </div>
        <div className='flex  w-full  items-center gap-3 p-4'>
            <div className='flex-[1]'>
                {/* image */}
                <User  className='bg-primary-dark/75 text-primary-extralight rounded-full size-[5.5vh]'/>
            </div>
            <div className='flex flex-[5] flex-col w-full  items-stat '>
                <span className='text-lg font-semibold'>User</span>
                <span className='opacity-45 '>Free Plan</span>
                
            </div>
        </div>
    </div>
  )
}

export default Sidebar
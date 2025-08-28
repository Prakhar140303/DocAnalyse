import React from 'react'
import {BadgeQuestionMark,Upload} from 'lucide-react'
function Header() {
  return (
    <div>
      <div className='w-full flex gap-4 justify-end p-2'>
          <div className='flex gap-2 p-2 rounded-lg bg-primary/20 '>
            <BadgeQuestionMark />
            help
          </div>
          <div className='flex gap-2 p-2 rounded-lg bg-primary text-white selected-hover'>
            <Upload />
            Upload
          </div>
      </div>
    </div>
  )
}

export default Header
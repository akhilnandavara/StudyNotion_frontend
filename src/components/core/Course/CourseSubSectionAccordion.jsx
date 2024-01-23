import React from 'react'
import { HiOutlineVideoCamera } from 'react-icons/hi'
import { convertSecondsToDuration } from '../../../utils/secToDuration'

export default function CourseSubSectionAccordion({subSec}) {
    
  return (
    <div>
        <div className='flex justify-between py-2'>
        <div className='flex items-center gap-2'>
            <i><HiOutlineVideoCamera /></i>
            <p>{subSec?.title}</p>
        </div>
        <div>{`${convertSecondsToDuration(subSec?.timeDuration)}`}</div>

        </div>
      
    </div>
  )
}

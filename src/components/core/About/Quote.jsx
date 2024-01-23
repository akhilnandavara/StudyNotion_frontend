import React from 'react'
import HighLightText from '../HomePage/HighLightText'

const Quote = () => {
  return (
    <div className='text-richblack-300 font-semibold text-center text-2xl lg:text-3xl'>
      We are passionate about revolutionizing the way we learn. Our innovative platform
       <HighLightText text={" combines technology,"}/>
        <span className='text-[orange]'> expertise, </span> 
         and community to create an 
         <span className='text-[orange]'> {" "}unparalleled educational experience.</span>
    </div>
  )
}

export default Quote

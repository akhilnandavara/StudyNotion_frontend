import React from 'react'
import logo1 from '../../../assets/TimeLineLogo/Logo1.svg'
import logo2 from '../../../assets/TimeLineLogo/Logo2.svg'
import logo3 from '../../../assets/TimeLineLogo/Logo3.svg'
import logo4 from '../../../assets/TimeLineLogo/Logo4.svg'
import timelineimg from '../../../assets/Images/TimelineImage.png'


const timeline=[
    {
        Logo:logo1,
        Heading:"Leadership",
        Description:"Fully committed to the success company"
    },
    {
        Logo:logo2,
        Heading:"Responsibility",
        Description:"Students will always be our top priority"
    },
    {
        Logo:logo3,
        Heading:"Flexibility",
        Description:"The ability to switch is an important skills"
    },
    {
        Logo:logo4,
        Heading:"Solve the problem",
        Description:"Code your way to a solution"
    },
]

const TimeSection = () => {
  return (
    
    <div className='flex flex-col lg:flex-row gap-5 items-center'>
      <div className='lg:w-[50%] flex flex-col gap-5' >
        {
            timeline.map((element,index)=>{
                return (
                    <div className='flex flex-row gap-6 items-center' key={index}>
                        <div className='w-[50px] h-[40px] rounded-full bg-white flex flex-col items-center  justify-center'>
                        <div className='w-[19px] h-[19.2px] '>
                        <img src={element.Logo} alt="logo1" />
                        </div>
                        </div>
                        <div className='flex flex-col'>
                            <h2 className='font-semibold text-[18px]'>{element.Heading}</h2>
                            <p className='text-base'>{element.Description}</p>
                        </div>
                    </div>
                )
            })
        }
</div>
<div className='relative '>
    <img src={timelineimg} alt="timelineimg"  className='object-cover'/>
    <div className='absolute right-0 lg:left-20 bottom-0 lg:-bottom-10 bg-caribbeangreen-700 p-4 lg:p-[42px] flex flex-col lg:flex-row mx-auto items-center gap-10 w-[10rem] lg:w-[450px] lg:h-[100px] uppercase'>
        <div className='flex items-center gap-1 lg:gap-5 border-r-caribbeangreen-500 lg:border-r-[1px]' >
            <div className='text-white text-3xl font-bold'>10</div>
            <div className='text-caribbeangreen-200 font-[500] text-sm  '>years experiences</div>
        </div>
        <div className='flex items-center gap-2'>
            <div className='text-white text-3xl font-bold'>250</div>
            <div className='text-caribbeangreen-200 font-[500] text-sm'>types of courses</div>
        </div>
    </div>
</div>

</div>
  )
}

export default TimeSection

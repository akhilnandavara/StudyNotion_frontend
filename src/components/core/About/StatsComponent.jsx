import React from 'react'

const StatsComponent = () => {
    const stats=[
        {count:"5K",label:"Active Students"},
        {count:"10+",label:"Mentors"},
        {count:"200+",label:"Courses"},
        {count:"50+",label:"Awards"},
    ]
  return (
    <section className='bg-richblack-700'>
        <div className='py-20 lg:px-28 w-11/12 max-w-maxContent mx-auto'>
        <div className='flex flex-row  gap-4'>
        {
            stats.map((data,index)=>(
                <div key={index} className='flex flex-col items-center w-[15rem] text-center'>
                    <h3 className='text-3xl font-bold   text-richblack-5'>{data.count}</h3>
                    <p className='text-richblack-300 font-semibold text-sm'>{data.label}</p>
                </div>
            ))
        }
        </div>
        </div>
     
    </section>
  )
}

export default StatsComponent

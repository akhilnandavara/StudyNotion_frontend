import React, { useRef } from 'react'
import {SwiperSlide,Swiper, useSwiper} from 'swiper/react'

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { IoIosArrowForward} from "react-icons/io";



import {  FreeMode, Mousewheel , Pagination } from 'swiper/modules';
import CourseDataCard from './Course_Card';

const CourseSlider = ({courses}) => {
  const swiperRef = useRef();


  return (
    <>
    {
      courses?.length?(
        <div>
        <Swiper 
        className='mySwiper relative'
        modules={[Pagination,FreeMode,Mousewheel]}
        slidesPerView={1}
        direction='horizontal'
        loop={true}
        freeMode={true}
        spaceBetween={25}
        pagination={{
          clickable:true,
          paginationDisabledClass:false
        }}
        mousewheel={true}
       
        breakpoints={{
          320: {
            slidesPerView: 1,
            spaceBetween: 30
          },
          680: {
            slidesPerView: 2,
            spaceBetween: 30,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 30
          },
        }
      }
      onBeforeInit={(swiper) => {
        swiperRef.current = swiper;
      }}
      
        >
          {
            courses.map((course,index)=>(
              <SwiperSlide key={index}>
                <CourseDataCard course={course} Height={"h-[10rem] w-[15rem] lg:h-[15rem] lg:w-[25rem]"}/>
              </SwiperSlide>
            ))
          }

          <div className='text-3xl cursor-pointer w-full z-10 flex  justify-between  absolute top-[50%]'>
           <button onClick={() => swiperRef.current?.slidePrev()} className=' rotate-180  '><IoIosArrowForward/></button>
           <button onClick={() => swiperRef.current?.slideNext()} ><IoIosArrowForward/></button>
          </div>
        </Swiper>
        </div>
        
        ):(
        <span>No Course Found</span>  
      )
      
      
    }
      
    </>
  )
}

export default CourseSlider

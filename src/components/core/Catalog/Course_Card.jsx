import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import RatingStars from "../../common/ReviewStars";
import GetAvgRating from "../../../utils/AvgRating";
import {FaRupeeSign} from 'react-icons/fa'

export default function CourseDataCard({ course, Height }) {

  const [avgRating,setAvgRating]=useState(0)
  
  useEffect(()=>{
    const avgRating=GetAvgRating(course?.ratingAndReviews);
    setAvgRating(avgRating);
  },[course])

  return (
    <div className="scale-[95%] ml-6   hover:scale-100 transition-all duration-300">
      <Link to={`/course/${course._id}`}>
        <div>
          <div className="rounded-lg">
            <img 
            src={course?.thumbnail} 
            alt="Course thumnail"
            loading = "lazy"
            className={`${Height}   rounded-xl object-cover  `}
             />
          </div>
          <div className="flex flex-col gap-2 px-1 py-3">
            <p className="text-xl text-richblack-5">{course?.courseName}</p>
            <p className="text-sm "> By <span className="text-yellow-50"> {course?.instructor?.firstName} {course?.instructor?.lastName}</span></p>
            <div className="flex items-center gap-2">
              <span className="text-yellow-5">{avgRating||0}</span>
              <RatingStars Review_Count={avgRating}/>
              <span className="text-richblack-400 hidden lg:visible">{course?.ratingAndReviews.length} Ratings</span>
            </div>
            <p className="text-xl text-richblack-5 flex items-center">
              <FaRupeeSign/>
               {course?.price}</p>
          </div>
        </div>
      </Link>
    </div>
  );
}

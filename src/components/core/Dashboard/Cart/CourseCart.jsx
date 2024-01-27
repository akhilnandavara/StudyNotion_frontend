import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {  RiDeleteBin6Line } from "react-icons/ri";
import {   MdCurrencyRupee } from "react-icons/md";
import {removeFromCart} from '../../../../slices/cartSlice'
import RatingStars from "../../../common/ReviewStars";
import GetAvgRating from "../../../../utils/AvgRating";

const CourseCart = () => {
  const { cart } = useSelector((state) => state.cart);
  const dispatch=useDispatch()
  
 
  const getAvgRatingCount=(cart)=>{
    // console.log(cart)
    return GetAvgRating(cart?.ratingAndReviews)
  }
  

  return (
    <div className="flex flex-1 flex-col">
      {
      cart.map((course, index) => (
        
        <div
        className={`flex w-full flex-wrap items-start justify-between gap-6 ${index !== cart.length - 1 && "border-b border-b-richblack-400 pb-6"} ${index !== 0 && "mt-6"} `}
          key={index}
        >
        <div className="flex flex-1 flex-col gap-4 xl:flex-row">
          <img src={course?.thumbnail} alt={course?.courseName} className="h-[148px] w-[220px] rounded-lg object-cover"  />

          <div className="flex flex-col gap-y-1">
            <p className="text-lg font-medium text-richblack-5">{course?.courseName}</p>
            <p className="text-sm text-richblack-300">{course?.category?.name}</p>
            <div className="flex flex-row items-center gap-2">
              {/* todo : Get avg review */}
              <span className="text-yellow-5">{getAvgRatingCount(course)}</span>
              <RatingStars Review_Count={getAvgRatingCount(course)}/>

              <span className="text-richblack-400">({course?.ratingAndReviews?.length} reviews)</span>
            </div>
            </div>
            </div>

            <div className="flex flex-col text-sm md:text-lg items-end space-y-2 ">
            <button onClick={() => dispatch(removeFromCart(course._id))} className="flex items-center gap-x-1 rounded-md border border-richblack-600 bg-richblack-700 py-3 px-[12px] text-pink-200"  >
              <RiDeleteBin6Line />
              <span>Remove</span>
            </button>
              <p className="mb-6 md:text-3xl text-xl font-medium flex items-center  text-yellow-100">
              <MdCurrencyRupee />  
                {course?.price}
              </p>
            </div>
            
          </div>
        
      ))}
    </div>
  );
};

export default CourseCart;

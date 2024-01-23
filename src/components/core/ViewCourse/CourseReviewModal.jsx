import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import ReactStars from "react-stars";
import IconBtn from "../../common/IconButton";
import { createRating } from "../../../services/operations/courseDetailsApi";
import{RxCross2 } from 'react-icons/rx'

export default function CourseReviewModal({ setReviewModal }) {
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);
  const { courseEntireData } = useSelector((state) => state.viewCourse);
  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    setValue("courseExperience", "");
    setValue("courseRating", "");
  }, []);

  // push review to DB
  const onSubmit = async (data) => {
    await createRating({
      courseId:courseEntireData._id,
      rating:data.courseRating,
      review:data.courseExperience,
    },token)
    setReviewModal(false)
  };

  // handle rating change of react star
  const ratingChanged = (newRating) => {
    setValue("courseRating", newRating);
  };

  return (
    <div className="fixed inset-0 z-[1000] !mt-0 grid h-screen w-screen place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm">
      <div lassName="my-10 w-11/12 max-w-[700px] rounded-lg border border-richblack-400 bg-richblack-800">
      {/* review Header */}
      <div className="flex items-center justify-between rounded-t-lg bg-richblack-700 p-5">
        <div className="text-xl font-semibold text-richblack-5">Add Review</div>
        <div    onClick={()=>setReviewModal(false)}><RxCross2 className="text-2xl text-richblack-5" /> </div>
      </div>
      {/* Review body */}
      <div className="p-6 text-richblack-800 bg-richblack-500 bg-opacity-20 rounded-md">
        <div className="flex items-center justify-center gap-x-4">
          <img
            src={user?.image}
            alt="Thumnail"
            className="aspect-square w-[4rem] rounded-full object-cover"
          />
          <div className="">
            <p className="font-semibold ">
              {user?.firstName} {user?.lastName}
            </p>
            <p className="text-sm ">Posted publicly</p>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-6 flex flex-col items-center">
          {/* Rating star */}
          <ReactStars
            count={5}
            onChange={ratingChanged}
            size={30}
            color2={"#ffd700"}
          />
          {/* Text area for filling experience */}
          <div className="flex w-11/12 flex-col space-y-2">
            <label className="text-sm "  htmlFor="courseExperience">Add your Experience <sup className="text-pink-200">*</sup></label>
            <textarea name="courseExperience" id="courseExperience" cols="30" rows="10"
            {...register("courseExperience",{required:true})}
            className="form-style resize-x-none min-h-[130px] w-full" 
            />
            {errors.courseExperience&&(<span className="ml-2 text-xs tracking-wide text-pink-200">Please Add Your Experience </span>)}
          </div>
          {/* Button */}
          <div className="mt-6 flex w-11/12 justify-end gap-x-2">
            <button  onClick={()=>setReviewModal(false)} className={`flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900`} >Cancel</button>
            <IconBtn
            text={"Save"}
            />

          </div>
        </form>
      </div>
    </div>
    </div>
  );
}

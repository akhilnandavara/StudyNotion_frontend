import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import IconBtn from "../../../../common/IconButton";
import { resetCourseState, setStep } from "../../../../../slices/courseSlice";
import { COURSE_STATUS } from "../../../../../utils/constants";
import { editCourseDetails } from "../../../../../services/operations/courseDetailsApi";
import { useNavigate } from "react-router-dom";
import { hideLoading, showLoading } from "react-redux-loading-bar";

const PublishCourse = () => {



  const {
    register,
    handleSubmit,
    setValue,
    getValues,
  } = useForm();
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { course } = useSelector((state) => state.course);
  const [loading, setLoading] = useState();
  const navigate=useNavigate()

  useEffect(()=>{
    if(course?.status===COURSE_STATUS.PUBLISHED){
      setValue("public",true)
    }
  },[])
  
  const goToBack = () => {
    dispatch(setStep(2));
  };

  const goToCourse=()=>{
    dispatch(resetCourseState());
    navigate("/dashboard/my-courses")
  }
  const handleCoursePublish = async () => {
    if (
      (course?.status === COURSE_STATUS.PUBLISHED &&
        getValues("public") === true) ||
      (course?.status === COURSE_STATUS.DRAFT && getValues("public") === false)
    ) {
      // No update done 
      // no need of api call
      goToCourse();
      return
    }

    const formData=new FormData()
    formData.append("courseId",course._id)

    const courseStatus=getValues("public")? COURSE_STATUS.PUBLISHED : COURSE_STATUS.DRAFT;
    formData.append("status",courseStatus)
    setLoading(true);
    dispatch(showLoading())

    const result=await editCourseDetails(formData,token);
    if(result){
      goToCourse();
    }
    setLoading(false);
    dispatch(hideLoading())
  };

  const onSubmit = () => {
    handleCoursePublish();
  };

  return (
    <div className="rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6 text-richblack-5 ">
      <p className="mb-4 text-xl font-bold">Publish Settings</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="public">
            <input
              type="checkbox"
              id="public"
              {...register("public")}
              className="border-gray-300 h-4 w-4 rounded bg-richblack-500 text-richblack-400 focus:ring-2 focus:ring-richblack-5"
            />

            <span className="ml-2 text-richblack-400">Make this course as  public</span>
          </label>
        </div>
        {/* Next Prev Button */}
        <div className="ml-auto flex max-w-max items-center gap-x-4">
          <button
            type="button"
            disabled={loading}
            onClick={() => goToBack()}
            className="flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900"
          >
            Back
          </button>
          <IconBtn disabled={loading} text={"Save Changes"} />
        </div>
      </form>
    </div>
  );
};

export default PublishCourse;

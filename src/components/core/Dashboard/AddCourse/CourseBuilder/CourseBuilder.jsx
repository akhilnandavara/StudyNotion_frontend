import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import IconBtn from "../../../../common/IconButton";
import { useState } from "react";
import { RiAddCircleLine } from "react-icons/ri";
import { MdArrowForward } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import NestedView from "./NestedView";
import {
  setCourse,
  setStep,
  setEditCourse,
} from "../../../../../slices/courseSlice";
import toast from "react-hot-toast";
import {
  createSection,
  updateSection,
} from "../../../../../services/operations/courseDetailsApi";

const CourseBuilderForm = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const [editSectionName, setEditSectionName] = useState(false);
  const { course } = useSelector((state) => state.course);
  const { token } = useSelector((state) => state.auth);
  

  const dispatch = useDispatch();

  // clear a section
  const onCancelEdit = () => {
    setEditSectionName(null);
    setValue("sectionName", "");
  };

  // Click on go back
  const onGoBack = () => {
    dispatch(setStep(1));
    dispatch(setEditCourse(true));
  };

  // Click on go next
  const onGoToNext = () => {
    if (course?.courseContent?.length === 0) {
      toast.error("Please add atleast one Section");
      return;
    }
    if (
      course.courseContent.some((section) => section.subSection.length === 0)
    ) {
      toast.error("Add atleast one leture in section");
      return;
    }
    dispatch(setStep(3));
  };

  // handles edit section name when clicked my nested view component
  const handleChangeEditSectionName = (sectionId, sectionName) => {

    // empty the edit section
    if (editSectionName === sectionId) {
      onCancelEdit();
      return;
    }
    setEditSectionName(sectionId);
    setValue(sectionName);
  };

  // form on submit
  const onSubmitHandler = async (data) => {
    
    let result;
    if (editSectionName) {
      result = await updateSection(
        {
          sectionName: data.sectionName,
          sectionId: editSectionName,
          courseId: course._id,
        },
        token
      );

    } else {
      result = await createSection(
        {
          sectionName: data.sectionName,
          courseId: course._id,
        },
        token
      );

    }
    // update a value
    // console.log("Result is", result);
    if (result) {
      dispatch(setCourse(result));
      setEditSectionName(null);
      setValue("sectionName", "");
    }
  };

  return (
    <div className="space-y-8 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6">
     
      <p  className="text-2xl font-semibold text-richblack-5">Course Builder</p>
      <form onSubmit={handleSubmit(onSubmitHandler)} className="space-y-4">
        <div className="flex flex-col space-y-2">
          <label htmlFor="sectionName" className="text-sm text-richblack-5">
            Section Name <sup className="text-pink-200">*</sup>
          </label>
          <input
            type="text"
            id="sectionName"
            placeholder="Add Section Name"
            {...register("sectionName", { required: true })}
            className="w-full form-style"
          />
          {errors.sectionName && (
            <span className="ml-2 text-xs tracking-wide text-pink-200">Section Name is required</span>
          )}

          {/* section creation */}
          <div className="flex items-end gap-x-4">
            <IconBtn
              type={"submit"}
              outline={true}
              customClasses={"text-white "}
              text={editSectionName ? "Edit Section Name" : "Create Section"}
            >
              <RiAddCircleLine className="text-yellow-25" />
            </IconBtn>

            {editSectionName && (
              <button
                type="button"
                onClick={onCancelEdit}
                className="text-sm text-richblack-300 underline"
              >
                cancel edit
              </button>
            )}
          </div>
        </div>
      </form>

      {course?.courseContent?.length > 0 && (
        <NestedView handleChangeEditSectionName={handleChangeEditSectionName} />
      )}
      <div className="flex justify-end gap-x-3">
        {/* Back Button */}
        <button
          type="button"
          onClick={onGoBack}
          className="flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900"
        >
          Back
        </button>
        {/* Next Button */}
        <IconBtn text={"Next"} type={"button"} onclick={onGoToNext}>
          <MdArrowForward />
        </IconBtn>
      </div>
      
    </div>
  );
};

export default CourseBuilderForm;

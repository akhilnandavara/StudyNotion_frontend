import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  addCourseDetails,
  editCourseDetails,
  fetchCourseCategories,
} from "../../../../../services/operations/courseDetailsApi";
import { HiOutlineCurrencyRupee } from "react-icons/hi";
import RequirementField from "./RequirementField";
import { setCourse, setStep } from "../../../../../slices/courseSlice";
import IconBtn from "../../../../common/IconButton";
import toast from "react-hot-toast";
import { COURSE_STATUS } from "../../../../../utils/constants";
import ChipInput from "./ChipInput";
import Upload from "../Upload";
import { hideLoading, showLoading } from "react-redux-loading-bar";
import { useLocation } from "react-router-dom";

const CourseInformationForm = () => {
  

  
  const {
    handleSubmit,
    register,
    getValues,
    setValue,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const { course, editCourse } = useSelector((state) => state.course);
  const { token } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const [courseCategories, setCourseCategories] = useState([]);
  const location=useLocation()
  

  const getCourseCategory = async () => {
    setLoading(true);
    dispatch(showLoading())
    const categories = await fetchCourseCategories();
    if (categories.length > 0) {
      setCourseCategories(categories);
    }
    setLoading(false);
    dispatch(hideLoading())

  };


  useEffect(() => {
    getCourseCategory();

    if (editCourse) {
      setValue("courseTitle", course.courseName);
      setValue("courseShortDesc", course.courseDescription);
      setValue("coursePrice", course.price);
      setValue("courseBenifits", course.whatYouWillLearn);
      setValue("courseCategory", course.category);
      setValue("courseRequirements", course.instructions.toString());
      setValue("courseTags", course.tag.toString());
      setValue("courseImage", course.thumbnail);
    }
  }, []);

  const isFormUpdated = () => {
    const currentValues = getValues();
    if (
      currentValues.courseTitle !== course.courseName ||
      currentValues.courseShortDesc !== course.courseDescription ||
      currentValues.coursePrice !== course.price ||
      currentValues.courseRequirements.toString() !==course.instructions.toString() ||
      currentValues.courseBenifits !== course.whatYouWillLearn ||
      currentValues.courseTags.toString() !== course.tag.toString() ||
      currentValues.CourseImage !== course.thumbnail ||
      currentValues.courseCategory._id !== course.category._id
    )
      return true;
    else return false;
  };

  // handle next button click
  const onSubmit = async (data) => {
    // editing form
    if (editCourse) {
      if (isFormUpdated()) {
        const currentValues = getValues();
        const formData = new FormData();
        formData.append("courseId", course._id);
        if (currentValues.courseTitle !== course.courseName) {
          formData.append("courseName", data.courseTitle);
        }
        if (currentValues.courseShortDesc !== course.courseDescription) {
          formData.append("courseDescription", data.courseShortDesc);
        }
        if (currentValues.coursePrice !== course.price) {
          formData.append("price", data.coursePrice);
        }
        if (currentValues.courseBenifits !== course.whatYouWillLearn) {
          formData.append("whatYouWillLearn", data.courseBenifits);
        }
        if (currentValues.courseCategory._id !== course.category._id) {
          formData.append("category", data.courseCategory);
        }
        if (
          currentValues.courseRequirements.toString() !==
          course.instructions.toString()
        ) {
          formData.append(
            "instructions",
            JSON.stringify(data.courseRequirements)
          );
        }
        if (currentValues.courseTags.toString() !== course.tag.toString()) {
          formData.append("tag", JSON.stringify(data.courseTags));
        }
        if (currentValues.courseImage !== course.thumbnail) {
          formData.append("thumbnail", data.courseImage);
        }
        setLoading(true);
        const result = await editCourseDetails(formData, token);
        setLoading(false);
        if (result) {
          dispatch(setStep(2));
          dispatch(setCourse(result));
        }
      } else {
        toast.error("No change made on form");
      }
      return;
    }
    const formData = new FormData();
    formData.append("courseName", data.courseTitle);
    formData.append("courseDescription", data.courseShortDesc);
    formData.append("price", data.coursePrice);
    formData.append("category", data.courseCategory);
    formData.append("instructions", JSON.stringify(data.courseRequirements));
    formData.append("whatYouWillLearn", data.courseBenifits);
    formData.append("tag", JSON.stringify(data.courseTags));
    formData.append("thumbnail", data.courseImage);
    formData.append("status", COURSE_STATUS.DRAFT);

    setLoading(true);
    const result = await addCourseDetails(formData, token);
    if (result) {
      dispatch(setStep(2));
      dispatch(setCourse(result));
    }
    setLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-8 rounded-md border border-richblack-700 bg-richblack-800 p-6 "
    >
      {/* Course title */}
      <div className="flex flex-col space-y-2">
        <label htmlFor="courseTitle" className="text-sm text-richblack-5 ">
          Course Title<sup className="text-pink-200">*</sup>
        </label>
        <input
          type="text"
          id="courseTitle"
          placeholder="Enter your title"
          {...register("courseTitle", { required: true })}
          className=" form-style w-full"
        />
        {errors.courseTitle && (
          <span className="ml-2 text-xs tracking-wide text-pink-200">
            Missing Course Title
          </span>
        )}
      </div>
      {/* Course Description */}
      <div className="flex flex-col space-y-2">
        <label htmlFor="courseShortDesc" className="text-sm text-richblack-5 ">
          Course Description <sup className="text-pink-200">*</sup>
        </label>
        <textarea
          id="courseShortDesc"
          placeholder="Enter your description"
          {...register("courseShortDesc", { required: true })}
          className="form-style resize-x-none min-h-[130px] w-full"
        />
        {errors.courseShortDescription && (
          <span className="ml-2 text-xs tracking-wide text-pink-200">
            Course decription is required{" "}
          </span>
        )}
      </div>

      {/* course Price */}
      <div className="flex flex-col space-y-2">
        <label htmlFor="coursePrice" className="text-sm text-richblack-5 ">
          Course Price
        </label>
        <div className="relative">
          <input
            id="coursePrice"
            placeholder="Enter your Price"
            className="form-style !pl-12 w-full"
            {...register("coursePrice", {
              required: true,
              valueAsNumber: true,
              pattern: {
                value: /^(0|[1-9\d*])(\.\d+)?$/,
              },
            })}
          />
          <HiOutlineCurrencyRupee className="absolute left-3 top-1/2 inline-block -translate-y-1/2 text-2xl text-richblack-400" />
        </div>
        {errors.coursePrice && <span className="text-pink-200">Course Price is required </span>}
      </div>
      {/* Course Category */}
      <div className="flex flex-col space-y-2">
        <label htmlFor="courseCategory" className="text-sm text-richblack-5 ">
          Course Category<sup className="text-pink-200">*</sup>
        </label>
        <select
          id="courseCategory"
          defaultValue=""
          {...register("courseCategory", { required: true })}
          className="form-style w-full "
        >
          <option value="" disabled>
            Choose Course Category
          </option>
          {!loading &&
            courseCategories.map((category, index) => (
              <option key={index} value={category?._id}>
                {category?.name}
              </option>
            ))}
        </select>
        {errors.courseCategory && (
          <span className="ml-2 text-xs tracking-wide text-pink-200">
            Choose course Category
          </span>
        )}
      </div>
      {/* Course tag */}
      <ChipInput
        label="Tag"
        name="courseTags"
        placeholder="Enter Tags and Press Enter"
        register={register}
        errors={errors}
        setValue={setValue}
        getValues={getValues}
      />

      {/* Create compnent to upload and preview of media */}
      <Upload
        name="courseImage"
        label="Course Thumbnail"
        register={register}
        setValue={setValue}
        errors={errors}
        editData={editCourse ? course?.thumbnail : null}
      />

      {/* benifits of course */}
      <div className="flex flex-col space-y-2">
        <label htmlFor="courseBenifits" className="text-sm text-richblack-5 ">
          Benifits of courses <sup className="text-pink-200">*</sup>{" "}
        </label>
        <textarea
          id="courseBenifits"
          placeholder="Enter benifits of this course"
          {...register("courseBenifits", { required: true })}
          className="form-style resize-x-none min-h-[130px] w-full"
        />
        {errors.courseBenifits && (
          <span className="ml-2 text-xs tracking-wide text-pink-200">
            Benefits of course required
          </span>
        )}
      </div>

      <RequirementField
        name="courseRequirements"
        label="Requirements/Instructions"
        register={register}
        errors={errors}
        setValue={setValue}
        getValues={getValues}
      />

      <div className="flex items-center justify-end gap-x-2">
        {editCourse && (
          <button
            type="button"
            onClick={() => dispatch(setStep(2))}
            className="flex items-center bg-richblack-300"
          >
            Continue without saving{" "}
          </button>
        )}
        <IconBtn text={!editCourse ? "Next" : "Save"} />
      
      </div>
    </form>
  ); 
};

export default CourseInformationForm;

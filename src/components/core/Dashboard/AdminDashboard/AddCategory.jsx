import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import IconBtn from "../../../common/IconButton";
import { createCategory } from "../../../../services/operations/AdminApi";

export default function AddCategory() {
  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm();

  const { token } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("name", data.categoryName);
    formData.append("description", data.categoryShortDesc);
    setLoading(true);
    await createCategory(formData, token);
    setValue("categoryName", "");
    setValue("categoryShortDesc", "");
    setLoading(false);
  };

  return (loading ? (
    <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
      <div className="spinner"></div>
    </div>
  ) : (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1 className="my-10 text-3xl font-medium text-richblack-5">
        {" "}
        Add Category{" "}
      </h1>

      <div className="w-[60%]  mx-auto my-10 space-y-8 rounded-md border border-richblack-700 bg-richblack-800 p-6 ">
        {/* Name */}
        <div className="flex flex-col space-y-2">
          <label htmlFor="categoryName" className="text-sm text-richblack-5 ">
            Category Name<sup className="text-pink-200">*</sup>
          </label>
          <input
            type="text"
            id="categoryName"
            placeholder="Enter your title"
            {...register("categoryName", { required: true })}
            className=" form-style w-full"
          />
          {errors.CategoryName && (
            <span className="ml-2 text-xs tracking-wide text-pink-200">
              Missing Category Name
            </span>
          )}
        </div>

        {/* Category Description */}
        <div className="flex flex-col space-y-2">
          <label
            htmlFor="categoryShortDesc"
            className="text-sm text-richblack-5 "
          >
            Category Description <sup className="text-pink-200">*</sup>
          </label>
          <textarea
            id="categoryShortDesc"
            placeholder="Enter Description"
            {...register("categoryShortDesc", { required: true })}
            className="form-style resize-x-none min-h-[130px] w-full"
          />
          {errors.categoryShortDescription && (
            <span className="ml-2 text-xs tracking-wide text-pink-200">
              Category Decription is required{" "}
            </span>
          )}
        </div>
        {/* Save Button */}
        <div className="flex justify-end">
          <IconBtn text={"Save"} />
        </div>
      </div>
    </form>
  )
  )
}

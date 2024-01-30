import React, { useEffect } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { createSubSection, updateSubSection } from "../../../../../services/operations/courseDetailsApi";
import { setCourse } from "../../../../../slices/courseSlice";
import {RxCross1} from 'react-icons/rx'
import Upload from "../Upload";
import IconBtn from '../../../../common/IconButton'
import { hideLoading, showLoading } from "react-redux-loading-bar";

const SubSectionModal = ({
  modalData,
  setModalData,
  add = false,
  edit = false,
  view = false,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
  } = useForm();

  const dispatch=useDispatch()
  const [loading,setLoading]=useState()
  const {course}=useSelector((state)=>state.course)
  const {token}=useSelector((state)=>state.auth)

  useEffect(()=>{
    if(view ||edit ){
        setValue("lectureTitle",modalData.title)
        setValue("lectureDesc",modalData.description)
        setValue("lectureVideo",modalData.videoUrl)
    }
  },[])

  const isFormUpdated=()=>{
    const currentValues=getValues();
    if(currentValues.lectureTitle!==modalData.title||
        currentValues.lectureDesc!==modalData.description||
        currentValues.lectureVideo!==modalData.videoUrl)
        return true
    else
    { return false }
}

  const handleEditSubsection=async()=>{
    const currentValue=getValues();
    const formData=new FormData()
    formData.append("sectionId",modalData.sectionId)
    formData.append("subSectionId",modalData._id)

    if(currentValue.lectureTitle!==modalData.title){
        formData.append("title",currentValue.lectureTitle)
    }
    if(currentValue.lectureDesc!==modalData.description){
        formData.append("description",currentValue.lectureDesc)
    }
    if(currentValue.lectureVideo!==modalData.videoUrl){
        formData.append("video",currentValue.lectureVideo)
    }
    setLoading(true)
    dispatch(showLoading())

    const result=await updateSubSection(formData,token)
    if(result){
      const updatedCourse=await course.courseContent.map((section)=>(
        section._id===modalData.sectionId?result:section
      ))
      dispatch(setCourse({...course,courseContent:updatedCourse}))
      
    }
    setModalData(null)
    dispatch(hideLoading())
    setLoading(false)
  }

  const handleOnSubmit=async(data)=>{
    if(view){
        return;
    }
    if(edit){
        if(!isFormUpdated){
            toast.error("No changes made in lecture");
        }
        else{
            // if data is edited 
            handleEditSubsection()
        }
        return
    }

    // Adding subsection 
    const formData=new FormData();
    formData.append("sectionId",modalData);//we get section id from courseBuilder code
    formData.append("title",data.lectureTitle);
    formData.append("description",data.lectureDesc);
    formData.append("video",data.lectureVideo);

    // setLoading(true)
    dispatch(showLoading())

    const result=await createSubSection(formData,token)
    if(result){
      const updatedCourse=await course.courseContent.map((section)=>(
        section._id===modalData ?result:section
      ))
      dispatch(setCourse({...course,courseContent:updatedCourse}))
      
    }
    setModalData(null);
    // setLoading(false);
    dispatch(hideLoading())

  }


  return(
   <div className="fixed inset-0 z-[1000] !mt-0 grid h-screen w-screen place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm">
      <div className="my-10 w-11/12 max-w-[700px] rounded-lg border border-richblack-400 bg-richblack-800">
       {/* Modal Header */}
        <div className="flex items-center justify-between rounded-t-lg bg-richblack-700 p-5">
          <p className="text-xl font-semibold text-richblack-5">{view &&"Viewing"} {edit &&"Editing "} {add &&"Adding"} Lecture</p>
          <button
          onClick={()=>(!loading ?setModalData(null) :{})}
          >
            <RxCross1 className="text-2xl text-richblack-5" />
          </button>  
        </div>
        {/* Modal Form */}
        <form onSubmit={handleSubmit(handleOnSubmit)} className="space-y-8 px-8 py-10">
          {/* video upload  */}
          <Upload
          name={"lectureVideo"}
          label={"Lecture Video"}
          register={register}
          setValue={setValue}
          errors={errors}
          video={true}
          viewData={view?modalData.videoUrl:null}
          editData={edit?modalData.videoUrl:null}
          />

{/* title */}
          <div className="flex flex-col space-y-2">
            <label className="text-sm text-richblack-5" htmlFor="lectureTitle"> Lecture Title{!view && <sup className="text-pink-200">*</sup>}</label>
            <input
            id="lectureTitle"
            placeholder="Enter lecture title"
            {...register("lectureTitle",{required:true})}
            className=" form-style w-full"
             />
             {errors.lectureTitle&&(<span className="ml-2 text-xs tracking-wide text-pink-200">lecture title is required </span>)}
          </div>
          {/* description */}
          <div className="flex flex-col space-y-2">
            <label className="text-sm text-richblack-5" htmlFor="lectureDesc">Lecture Description  {!view && <sup className="text-pink-200">*</sup>}</label>
            <textarea 
            placeholder="Enter lecture description"
            id="lectureDesc" 
            cols="30" rows="10"
            {...register("lectureDesc",{required:true})}
            className="form-style resize-x-none min-h-[130px] w-full" 
            />
            {
              errors.lectureDesc&&(<span className=" ml-2 text-xs tracking-wide text-pink-200">lecture description is required </span>)
            }
          </div>

          {
            !view&&(
              <div className="flex justify-end">
                <IconBtn
                disabled={loading}
                text={loading?"Loading..":edit?"Save Changes":"Save"}
                />
              </div>
            )
          }

        </form>
      </div>

   </div>
   )
};

export default SubSectionModal;

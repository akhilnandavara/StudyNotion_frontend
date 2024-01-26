import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table, Tbody, Td, Th, Thead, Tr } from "react-super-responsive-table";
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import { COURSE_STATUS } from "../../../../utils/constants";
import {MdPending,MdEdit,MdOutlineDelete} from 'react-icons/md'
import {FaCheck} from 'react-icons/fa'
import ConfirmationModal from "../../../common/ConfirmationModal";
import { deleteCourse, fetchInstructorCourses } from "../../../../services/operations/courseDetailsApi";
import { useNavigate } from "react-router-dom";
import { formatDate } from "../../../../services/operations/formatDate";
import { hideLoading, showLoading } from "react-redux-loading-bar";

export default function CourseTable({ courses, setCourses }) {
  const { token } = useSelector((state) => state.auth);
  const navigate=useNavigate()
  const [loading, setLoading] = useState(false);
  const [confirmationModal, setConfirmationModal] = useState(null);
  const TRUNCATE_LENGTH = 30
  const dispatch=useDispatch()


const handleDeleteCourse=async(courseId)=>{
    setLoading(true)
    dispatch(showLoading())
    
    await deleteCourse({courseId:courseId},token);

    const result=await fetchInstructorCourses(token)
    if(result){
        setCourses(result)
    }
    setConfirmationModal(null)
    setLoading(false)
    dispatch(hideLoading())
}
  return (
    <div>
      <Table className=" my-10 rounded-xl border border-richblack-800">
        <Thead>
          <Tr className="flex gap-x-10 rounded-t-md border-b border-b-richblack-800 px-6 py-2">
            <Th className="flex-1 text-left text-sm font-medium uppercase text-richblack-100"><span className="flex-1 text-richblack-100 text-left text-sm font-medium uppercase">Courses</span></Th>
            <Th className="text-left text-sm font-medium uppercase text-richblack-100">Duration</Th>
            <Th className="text-left text-sm font-medium uppercase text-richblack-100">Price</Th>
            <Th className="text-left text-sm font-medium uppercase text-richblack-100">Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {courses.length === 0 ? (
            <Tr>
              <Td className="py-10 text-center text-2xl font-medium text-richblack-100">No Course Found</Td>
            </Tr>
          ) : (
            courses?.map((course) => (
              <Tr key={course._id}  className="flex  gap-x-10 border-b border-richblack-800 px-6 py-8 my-4 md:m-0">
                {/* first column */}
                <Td className="flex flex-1 gap-x-4  ">
                  <img
                    src={course?.thumbnail}
                    alt={course?.courseName} 
                    className="h-[148px] w-[220px] rounded-lg object-cover"
                  />
                  <div className="flex flex-col justify-between gap-4">
                    <p className="text-lg font-semibold text-richblack-5">{course?.courseName}</p>
                    <p className="text-xs text-richblack-300">
                    {course.courseDescription.split(" ").length > TRUNCATE_LENGTH  ? course.courseDescription.split(" ").slice(0, TRUNCATE_LENGTH).join(" ") + "..." : course.courseDescription}
                    </p>
                    <p className="text-[12px] text-richblack-5">Created:{formatDate(course.createdAt)}</p>
                    {course?.status === COURSE_STATUS.DRAFT ? (
                      <p className="flex w-fit flex-row items-center gap-2 rounded-full bg-richblack-700 px-2 py-[2px] text-[12px] font-medium text-pink-100">
                        <MdPending size={14}/>DRAFTED</p>
                    ) : (
                      <div className="flex w-fit flex-row items-center gap-2 rounded-full bg-richblack-700 px-2 py-[2px] text-[12px] font-medium text-yellow-100">
                        <div className="flex h-3 w-3 items-center justify-center rounded-full bg-yellow-100 text-richblack-700">
                          <FaCheck size={8} />
                        </div>
                        Published
                      </div>
                    )}
                  </div>
                </Td>

                {/* Second Column */}
                <Td className="text-sm font-medium text-richblack-100">{course.totalDuration}</Td>
                {/* third Column */}
                <Td className="text-sm font-medium text-richblack-100">{course.price}</Td>
                {/* forth Column */}
                <Td className="text-sm font-medium text-richblack-100">
                  <div className="flex  items-center gap-2">
                    <button
                    disabled={loading}
                    onClick={()=>navigate(`/dashboard/edit-course/${course._id}`)}
                    ><MdEdit size={20}/></button>
                  
                    <button 
                    className="px-1 transition-all duration-200 hover:scale-110 hover:text-[#ff0000]"
                    disabled={loading}
                    onClick={()=>{setConfirmationModal({
                        text1:"Do You Want Delete This Course?",
                        text2:"All the Data related to this course Will be deleted",
                        btn1Text:"Delete",
                        btn2Text:"Cancel",
                        btn1Handler:!loading?()=>handleDeleteCourse(course._id):()=>{},
                        btn2Handler:!loading?()=>setConfirmationModal(null):()=>{}
                    })}}
                    ><MdOutlineDelete size={20}/></button> 
                    
                    </div>
                </Td>

              </Tr>
            ))
          )}
        </Tbody>
      </Table>
      {confirmationModal &&<ConfirmationModal modalData={confirmationModal}/>}
    </div>
  );
}

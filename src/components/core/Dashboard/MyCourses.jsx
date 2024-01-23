import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { fetchInstructorCourses } from '../../../services/operations/courseDetailsApi';
import IconBtn from '../../common/IconButton';
import {FaPlus} from 'react-icons/fa6'
import CourseTable from './InstructorsCourses/CourseTable';



const MyCourses = () => {
    const navigate=useNavigate();
    const {token}=useSelector((state)=>state.auth)
    const [courses,setCourses]=useState([])

    

    useEffect(()=>{
        const fetchCourses=async()=>{
            const result=await fetchInstructorCourses(token);
            if(result){
                setCourses(result);
            }
        }

        fetchCourses();
    },[])

  return (
    <div>
        <div className='my-14 flex items-center justify-between'>
            <h1 className='text-3xl font-medium text-richblack-5'>My courses</h1>
            <IconBtn
            text={"Add course"}
            onclick={()=>navigate("/dashboard/add-course")}
            ><FaPlus/></IconBtn>
        </div>
        {courses&&<CourseTable courses={courses} setCourses={setCourses}/>}
      
    </div>
  )
}

export default MyCourses

import React, { useEffect, useState } from "react";
import { fetchInstructorDashboard } from "../../../../services/operations/profileApi";
import { useDispatch, useSelector } from "react-redux";
import { fetchInstructorCourses } from "../../../../services/operations/courseDetailsApi";
import { Link } from "react-router-dom";
import InstructorChart from "./InstructorChart";
import { hideLoading, showLoading } from "react-redux-loading-bar";

export default function Instructor() {
  const [loading, setLoading] = useState(false);
  const [courses, setCourses] = useState([]);
  const [instructorData, setInstructorData] = useState([]);
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const dispatch=useDispatch()

  useEffect(() => {
    (async () => {
      setLoading(true);
      dispatch(showLoading())
      const instructorDashboardStats = await fetchInstructorDashboard(token);
      const instructorCourses = await fetchInstructorCourses(token);
      if (instructorDashboardStats?.length) {
        setInstructorData(instructorDashboardStats);
      }
      if (instructorCourses) {
        setCourses(instructorCourses);
      }
      setLoading(false);
      dispatch(hideLoading())

    })();
    // eslint-disable-next-line
  }, []);

  const totalAmountGenerated = instructorData?.reduce(
    (acc, curr) => acc + curr.totalAmountGenerated,
    0
  );
  const totalStudentsEnrolled = instructorData?.reduce(
    (acc, curr) => acc + curr.totalStudentsEnrolled,
    0
  );
  return (
    <div>
      <div className=" my-4 space-y-2">
        <h1 className="text-2xl font-bold text-richblack-5">
          Hi {user.firstName}
        </h1>
        <p className="font-medium text-richblack-200">
          Let's Start Something New
        </p>
      </div>
      {loading ? (
         <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
         <div className="spinner"></div>
       </div>  
      ) : courses.length > 0 ? (
        <div>
          
          {/* Render Chart section 1  */}
          <div className="my-4  w-full gap-4  flex flex-col lg:flex-row  justify-between lg:space-x-4">
            <div className="lg:w-[70%]">
            {
            totalAmountGenerated > 0 || totalStudentsEnrolled > 0 ? (
              <InstructorChart instructorData={instructorData} />
            ) : (
              <div className="flex-1 rounded-md bg-richblack-800 p-6">
                <p className="text-lg font-bold text-richblack-5">Visualize</p>
                <p className="mt-4 text-xl font-medium text-richblack-50">Not Enough Data To Visualize{" "}</p>
              </div>
            )
            }
            </div>
            {/* Statistics */}
            <div className="flex w-full lg:w-[30%] flex-col rounded-md bg-richblack-800 p-6">
              <p className="text-lg font-bold text-richblack-5">Statistics</p>
              <div className="mt-4 lgspace-y-4">
                <div>
                  <p className="text-lg text-richblack-200">Total Courses</p>
                  <p className="text-3xl font-semibold text-richblack-50">
                    {courses?.length}
                  </p>
                </div>

                <div>
                  <p className="text-lg text-richblack-200">Total Students</p>
                  <p className="text-3xl font-semibold text-richblack-50">
                    {totalStudentsEnrolled}
                  </p>
                </div>

                <div>
                  <p className="text-lg text-richblack-200">Total Income</p>
                  <p className="text-3xl font-semibold text-richblack-50">
                    Rs. {totalAmountGenerated}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* section 2  Courses*/}
          <div className="rounded-md bg-richblack-800 p-6 my-4">
            <div className="flex items-center justify-between">
              <p className="text-lg font-bold text-richblack-5">Your Courses</p>
              <Link to={"/dashboard/my-courses"} className="text-xs font-semibold text-yellow-50">View All</Link>
            </div>
            
            <div className="my-4 flex  items-start gap-4">
              {courses.slice(0, 3).map((course, index) => (
                <div key={index} className="w-1/3">
                  <img src={course.thumbnail} alt={"Thumbnail"}  className=" h-[100px] md:h-[201px] w-full rounded-md object-cover"/>
                  <div className="mt-3 w-full">
                    <p className="text-sm font-medium text-richblack-50">{course.courseName}</p>
                    <div className="mt-1 flex items-center space-x-2">
                      <p className="text-xs font-medium text-richblack-300">{course.studentsEnrolled.length} students</p>
                      <p className="text-xs font-medium text-richblack-300">|</p>
                      <p className="text-xs font-medium text-richblack-300">Rs. {course.price}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className=" flex  gap-10  items-center my-20 rounded-md bg-richblack-800 p-6 py-20">
          <Link to={"/dashboard/add-course"} className=" text-center text-lg font-semibold text-yellow-50">Add Course</Link>
          <p className="text-center text-2xl font-bold text-richblack-5">You have not created any courses</p>
        </div>
      )}
    </div>
  );
}

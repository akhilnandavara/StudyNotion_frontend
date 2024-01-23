import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import ProgressBar from "@ramonak/react-progress-bar";
import { fetchEnrolledCourses } from "../../../services/operations/profileApi";
import { useNavigate } from "react-router-dom";
import { hideLoading, showLoading } from "react-redux-loading-bar";

const EnrolledCourses = () => {
  const { token } = useSelector((state) => state.auth);
  const [enrolledCourses, setEnrolledCourses] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const getEnrolledCourses = async () => {
    try {
      dispatch(showLoading())
      const response = await fetchEnrolledCourses(token);
      setEnrolledCourses(response)
    } catch (error) {
      toast.error(error.response.data.message);
      console.log("Enrolled error-", error);
    }
    dispatch(hideLoading())
  }

  useEffect(() => {
    getEnrolledCourses();
  }, []);

  return (
    <>
      <div className="text-3xl mt-4 text-richblack-50">Enrolled Courses</div>
        {!enrolledCourses ? (
          <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
            <div className="spinner"></div>
          </div>
        ) : !enrolledCourses.length ? (
          <div className="grid h-[10vh] w-full place-content-center text-richblack-5">
            You've not enrolled any courses{" "}
          </div>
        ) : (
          <div className="my-8 text-richblack-5">
            {/* Heading */}
            <div className="flex rounded-t-lg bg-richblack-500 ">
              <p className="w-[45%] px-5 py-3">Course Name</p>
              <p className="w-1/4 px-2 py-3">Duration</p>
              <p className="flex-1 px-2 py-3">Progress</p>
            </div>
            {/* cards starts here */}
              {/* Course Name */}
              {enrolledCourses.map((course, index, arr) => (
                <div
                  className={`flex items-center border border-richblack-700 ${ index === arr.length - 1 ? "rounded-b-lg" : "rounded-none"}`} key={index}>
                  {/* left part */}
                  <div className="flex w-[45%] cursor-pointer items-center gap-4 px-5 py-3"
                    onClick={() => navigate(`/view-course/${course?._id}/section/${course?.courseContent[0]._id}/subSection/${course?.courseContent[0]?.subSection[0]._id}`)}>
                    <img
                      src={course?.thumbnail}
                      alt="Thumbnail"
                      loading = "lazy"
                      className="h-14 w-14 rounded-lg object-cover" 
                    />
                    <div className="flex max-w-xs flex-col gap-2">
                      <p className="font-semibold">{course?.courseName}</p>
                      <p className="text-xs text-richblack-300">
                      {course.courseDescription.length > 50 ? `${course.courseDescription.slice(0, 50)}...` : course.courseDescription}  
                        </p>
                    </div>
                  </div>

                  <div className="w-1/4 px-2 py-3">{course?.totalDuration}</div>
                  <div className="flex w-1/5 flex-col gap-2 px-2 py-3">
                    <div>Progress {course?.progressPercentage || 0}%</div>
                    <ProgressBar
                      completed={course?.progressPercentage || 0}
                      maxCompleted={100}
                      height="8px"
                      isLabelVisible={false}
                    />
                  </div>
                </div>
              ))}
            
          </div>
        )}
    </>
  );
};

export default EnrolledCourses;

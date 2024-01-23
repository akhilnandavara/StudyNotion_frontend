import React, { useEffect, useState } from "react";
import ViewCourseDetailsSideBar from "../components/core/ViewCourse/ViewCourseDetailsSideBar";
import CourseReviewModal from "../components/core/ViewCourse/CourseReviewModal";
import { getFullDetailsOfCourse } from "../services/operations/courseDetailsApi";
import { Outlet, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  setCompletedLectures,
  setCourseSectionData,
  setEntireCourseData,
  setTotalNoOfLectures,
} from "../slices/viewCourseSlice";

export default function ViewCourse() {
  const [reviewModal, setReviewModal] = useState();
  const { courseId } = useParams();
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  
  // Fetch a full course details
  useEffect(() => {
    ;( async () => {
      const updatedCourseId=courseId.trim() //Removes white spaces
      const courseData = await getFullDetailsOfCourse(updatedCourseId, token);
      if(courseData){
        dispatch(setCourseSectionData(courseData?.courseDetails?.courseContent));
        dispatch(setEntireCourseData(courseData?.courseDetails));
        dispatch(setCompletedLectures(courseData?.completedVideos));
      }
        let lectures = 0;
        courseData?.courseDetails?.courseContent.forEach(
          (sec) => (lectures += sec.subSection.length)
        );
        dispatch(setTotalNoOfLectures(lectures));
    })()
  }, [])
  
  return (
    <>
      <div className="relative flex min-h-[calc(100vh-3.5rem)]">
        <ViewCourseDetailsSideBar setReviewModal={setReviewModal} />
        <div className="h-[calc(100vh-3.5rem)] flex-1 overflow-auto">
            <div className="mx-6">
              <Outlet />
            </div>
      </div>
      {reviewModal && <CourseReviewModal setReviewModal={setReviewModal} />}
      </div>

    </>
  );
}

import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import IconBtn from "../../common/IconButton";
import { MdOutlineKeyboardArrowUp, MdOutlinePending } from "react-icons/md";
import { FaCheck } from "react-icons/fa";
import { IoIosArrowBack } from "react-icons/io";
import useOnClickOutside from "../../../hooks/useOnClickOutside";
import { setActiveSideBar } from "../../../slices/viewCourseSlice";

export default function ViewCourseDetailsSideBar({ setReviewModal }) {
  const [activeStatus, setActiveStatus] = useState("");
  const [videoBarActive, setVideoBarActive] = useState("");
  const { sectionId, subSectionId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.profile);
  const { activeSideBar } = useSelector((state) => state.viewCourse);
  const userId = user._id;

  const {
    courseSectionData,
    courseEntireData,
    completedLectures,
    totalNoOfLectures,
  } = useSelector((state) => state.viewCourse);

  const courseId = courseEntireData._id;
  const ref = useRef(null);
  useOnClickOutside(ref, () => dispatch(setActiveSideBar(false)));

  useEffect(() => {
    (() => {
      if (!courseSectionData.length) return;
      const currentSectionIndex = courseSectionData.findIndex((data) => data._id === sectionId); //check section id of data in slice with section id from params nd return the index if its matched
      const currentSubSectionIndex = courseSectionData?.[currentSectionIndex]?.subSection.findIndex((data) => data._id === subSectionId); //chcek subSection id of data in slice with subSection id from params nd return the index if its matched
      const activeSubSectionId =courseSectionData?.[currentSectionIndex]?.subSection?.[currentSubSectionIndex]._id;
      // set Current sectionId
      setActiveStatus(courseSectionData?.[currentSectionIndex]?._id);
      // set Current Sub section Id
      setVideoBarActive(activeSubSectionId);
    })();
  }, [courseEntireData, courseSectionData, location.pathname]);

  return (
    <>
      {!videoBarActive ? (
        <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
          <div className="spinner"></div>
        </div>
      ) : (
        <div
          ref={ref}
          className={`${
            activeSideBar ? "flex" : "hidden"
          }  h-[calc(100vh-3.5rem)] w-[30vw]  md:w-[320px] max-w-[350px] flex-col border-r-[1px] border-r-richblack-700 bg-richblack-800 transition-all duration-300`}
        >
          {/* For heading and button */}
          <div className="mx-5 flex flex-col items-start justify-between gap-2 gap-y-4 border-b border-richblack-600 py-5 text-lg font-bold text-richblack-25">
            {/*  button */}
            <div className="flex w-full  flex-wrap  gap-4 items-center justify-between ">
              {/* BAck button */}
              <div className="flex h-[35px] w-[35px] items-center justify-center rounded-full bg-richblack-100 p-1 text-richblack-700 hover:scale-90">
                <button onClick={() => navigate("/dashboard/enrolled-courses")}>
                  <IoIosArrowBack size={30} />
                </button>
              </div>
              {/* Add Review Button  */}
              <div>
                {/* { console.log("Reviewid",courseEntireData?.ratingAndReviews?.[0].course===courseId)} */}
                <IconBtn
                  text={`${
                    courseEntireData?.ratingAndReviews?.find(
                      (review) =>
                        review?.course === courseId && review?.user === userId
                    )
                      ? "Edit Review"
                      : "Add Review"
                  }`}
                  onclick={() => setReviewModal(true)}
                />
              </div>
            </div>
            {/* Heading */}
            <div className="flex flex-col">
              <p>{courseEntireData?.courseName}</p>
              <p className="text-sm font-semibold text-richblack-500">
                {completedLectures.length}/{totalNoOfLectures}
              </p>
            </div>
          </div>

          {/* Section and Subsection  */}
          <div className="h-[calc(100vh - 5rem)] overflow-y-auto">
            {courseSectionData?.map((section, index) => (
              <div
                className="mt-2 cursor-pointer text-sm text-richblack-5"
                key={index}
                onClick={() => setActiveStatus(section?._id)}
              >
                {/* Section */}
                <div className="flex flex-row justify-between bg-richblack-600 px-5 py-4">
                  <div className="w-[70%] font-semibold">
                    {section?.sectionName}
                  </div>
                  <div className="flex items-center gap-3">
                    <span
                      className={` ${
                        activeStatus === section._id ? "rotate-0" : "rotate-180"
                      }  transition-all duration-500`}
                    >
                      <MdOutlineKeyboardArrowUp />
                    </span>
                  </div>
                </div>

                {/*sub Section */}
                {activeStatus === section?._id && ( //check active Status state contains clicked section id
                  <div className="transition-[height] duration-500 ease-in-out">
                    {section?.subSection?.map((lecture, index) => (
                      <div
                        key={index}
                        className={` flex items-center py-2 px-2  gap-2 ${
                          videoBarActive === lecture?._id
                            ? "text-black bg-yellow-50"
                            : "bg-richblack-900 text-white"
                        }`}
                        onClick={() => {
                          navigate(
                            `/view-course/${courseEntireData?._id}/section/${section?._id}/subSection/${lecture?._id}`
                          );
                          setVideoBarActive(lecture._id);
                        }}
                      >
                        <div>
                          {completedLectures?.includes(lecture._id) ? (
                            <FaCheck className="text-caribbeangreen-5"/>
                          ) : (
                            <MdOutlinePending />
                          )}
                        </div>
                        <span>{lecture.title}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

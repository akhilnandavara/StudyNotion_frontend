import React, { useEffect, useState } from "react";
import { buyCourse } from "../services/operations/studentFeatureApi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { fetchCourseDetails } from "../services/operations/courseDetailsApi";
import GetAvgRating from "../utils/AvgRating";
import Error from "./Error";
import ConfirmationModal from "../components/common/ConfirmationModal";
import RatingStars from "../components/common/ReviewStars";
import { formatDate } from "../services/operations/formatDate";
import CourseDetailsCard from "../components/core/Course/CourseDetailsCard";
import { BiInfoCircle } from "react-icons/bi";
import { HiOutlineGlobeAlt } from "react-icons/hi";
import Markdown from "react-markdown";
import CourseAccordionBar from "../components/core/Course/CourseAccordionBar";
import Footer from "../components/common/Footer";
import { ACCOUNT_TYPE } from "../utils/constants";
import toast from "react-hot-toast";
import { addToCart } from "../slices/cartSlice";
import { FaRupeeSign } from "react-icons/fa";

export default function CourseDetails() {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const { loading } = useSelector((state) => state.auth);
  const { paymentLoading } = useSelector((state) => state.course);
  const { cart } = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { courseId } = useParams(); // Getting courseId from url parameter

  const [courseData, setCourseData] = useState(null); // Declear a state to save the course details
  const [confirmationModal, setConfirmationModal] = useState(null);
  const [avgRatingCount, setAvgRatingCount] = useState(0);
  const [totalNoOfLectures, settotalNoOfLectures] = useState(0);

  useEffect(() => {
    // Fetch course data from db and set a state
    const fetchCourseFullDetails = async () => {
      try {
        const result = await fetchCourseDetails(courseId);

        setCourseData(result);
      } catch (error) {
        console.log(error);
      }
    };
    if (!courseData) {
      fetchCourseFullDetails();
    }
  }, [courseId]);

  // Calculating Avg Review count

  useEffect(() => {
    // console.log(courseData?.data?.courseDetails?.ratingAndReviews)
    const count = GetAvgRating(
      courseData?.data?.courseDetails.ratingAndReviews
    );
    setAvgRatingCount(count);
  }, [courseData]);

  // Total number of lectures
  useEffect(() => {
    let lectures = 0;
    courseData?.data?.courseDetails.courseContent.forEach((sec) => {
      lectures += sec.subSection.length || 0;
    });
    settotalNoOfLectures(lectures);
  }, [courseData]);

  const [isActive, setIsActive] = useState(Array(0));

  const handleActive = (id) => {
    setIsActive(
      !isActive.includes(id)
        ? isActive.concat([id])
        : isActive.filter((e) => e !== id)
    );
  };

  if (loading || !courseData) {
    return (
      <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
        <div className="spinner"></div>
      </div>
    );
  }
  if (!courseData.success) return <Error />;

  if (paymentLoading) {
    return (
      <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
        <div className="spinner"></div>
      </div>
    );
  }

  // Handle add to cart
  const handleAddToCart = () => {
    if (user && user.accountType === ACCOUNT_TYPE.INSTRUCTOR) {
      toast.error("Your the instructor cant buy this course");
      return;
    }
    if (token && !cart.includes(courseId)) {
      dispatch(addToCart(courseData.data.courseDetails));
    }

    if (!token) {
      setConfirmationModal({
        text1: "Do you want login",
        text2: "Please login to purchase this course",
        btn1Text: "Login",
        btn2Text: "cancel",
        btn1Handler: () => navigate("/login"),
        btn2Handler: () => setConfirmationModal(null),
      });
    }
  };

  // Handle Buy course
  const handleBuyCourse = () => {
    if (user && user.accountType === ACCOUNT_TYPE.INSTRUCTOR) {
      toast.error("Your the instructor cant buy this course");
      return;
    }
    if (token) {
      buyCourse(token, user, [courseId], navigate, dispatch);
      return;
    }

    setConfirmationModal({
      text1: "Your not logged in",
      text2: "Please login to purchase this course",
      btn1Text: "Log in",
      btn2Text: "cancel",
      btn1Handler: () => navigate("/login"),
      btn2Handler: () => setConfirmationModal(null),
    });
  };

  // Destructure required key from course Data
  const {
    courseName,
    courseDescription,
    instructor,
    createdAt,
    whatYouWillLearn,
    courseContent,
    ratingAndReviews,
    studentsEnrolled,
    price,
  } = courseData.data.courseDetails;

  return (
    <>
      <div className="relative w-full bg-richblack-800">
        {/* Hero section */}
        <div className="mx-auto box-content   px-4 lg:w-[1260px] 2xl:relative ">
          <div className="mx-auto  grid min-h-[450px] max-w-maxContentTab items-center py-8 lg:mx-0 lg:justify-items-start lg:py-0 xl:max-w-[810px]">
            {/* CourseDetails */}
            <div
              className={`z-30 md:my-5 flex flex-col w-full  justify-center gap-4 py-5 text-lg text-richblack-5`}
            >
              <div className="lg:hidden">
                <img
                  src={courseData?.data?.courseDetails?.thumbnail}
                  alt="Thumbnail"
                  loading="lazy"
                  className=" rounded-md object-cover w-full my-4"
                />
              </div>
              {/* course Name */}
              <p className="text-4xl font-bold text-richblack-5 sm:text-[42px]">
                {courseName}
              </p>
              {/* course description */}
              <p className={`text-richblack-200`}>{courseDescription}</p>
              {/* rating  */}
              <div className="text-md flex flex-wrap items-center gap-2">
                <span className="text-yellow-25">{avgRatingCount || ""}</span>
                <RatingStars Review_Count={avgRatingCount} />
                <span>{`(${ratingAndReviews.length || "No"} reviews)`}</span>
                <span>{`(${studentsEnrolled.length} students enrolled)`}</span>
              </div>
              {/* Instructor name */}
              <div>
                <p className="">
                  {" "}
                  Created By {`${instructor.firstName} ${instructor.lastName}`}{" "}
                </p>
              </div>
              <div className="flex flex-wrap gap-5 text-lg">
                <p className="flex items-center gap-2">
                  {" "}
                  <BiInfoCircle /> Created at {formatDate(createdAt)}{" "}
                </p>
                <p className="flex items-center gap-2">
                  {" "}
                  <HiOutlineGlobeAlt /> English{" "}
                </p>
              </div>
            </div>
            <div className=" block lg:hidden" >
        <div className="space-x-3 pb-4 text-3xl text-richblack-5 font-semibold flex items-center">
           <FaRupeeSign/>{price}
        </div>

        <div className="flex flex-col gap-4">
          <button
            className="yellowButton"
            onClick={
              user &&studentsEnrolled.includes(user?._id)
                ? () => navigate("/dashboard/enrolled-courses")
                : () => handleBuyCourse()
            }
          >
            {user && studentsEnrolled.includes(user?._id)
              ? "Go to Course"
              : "Buy Now"}
          </button>

          {!studentsEnrolled.includes(user?._id) && (
            <button className="blackButton" onClick={() => handleAddToCart()} >
              Add to cart
            </button>
          )}
        </div>
          </div>
          </div>
          {/* Course Card */}
          <div className="right-[1rem] top-[60px] mx-auto hidden min-h-[600px] w-1/3 max-w-[410px] translate-y-24 md:translate-y-0 lg:absolute  lg:block">
            <CourseDetailsCard
              course={courseData?.data?.courseDetails}
              setConfirmationModal={setConfirmationModal}
              handleBuyCourse={handleBuyCourse}
            />
          </div>
        </div>
      </div>

      <div className="mx-auto box-content px-4  w-[90%]  text-start text-richblack-5 lg:w-[1260px]">
        <div className="mx-auto max-w-maxContentTab lg:mx-0 xl:max-w-[810px]">
          {/* what You Will Learn section */}
          <div className="my-8 border border-richblack-600 p-8">
            <p className="text-3xl font-semibold"> What you will learn</p>
            <div className="mt-5">
              <Markdown>{whatYouWillLearn}</Markdown>
            </div>
          </div>

          {/* Course Content Section */}
          <div className="max-w-[830px]">
            <div className="flex flex-col gap-3">
              <p className="text-[28px] font-semibold">Course Content</p>

              <div className="flex flex-wrap justify-between gap-2">
                <div className="flex gap-2">
                  <span>
                    {courseContent.length} {`section(s)`}
                  </span>
                  <span>
                    |{totalNoOfLectures}| {`lecture(s)`}
                  </span>
                  <span>{courseData.data?.totalDuration} total length</span>
                </div>

                <div>
                  <button
                    className="text-yellow-25"
                    onClick={() => setIsActive([])}
                  >
                    Collaps all section
                  </button>
                </div>
              </div>
            </div>

            {/* Course Details Accordion */}
            <div className="py-4">
              {courseContent?.map((course, index) => (
                <CourseAccordionBar
                  course={course}
                  key={index}
                  isActive={isActive}
                  handleActive={handleActive}
                />
              ))}
            </div>

            {/* Autor Details */}
            <div className="mb-12 py-4">
              <p className="text-[28px] font-semibold">Author</p>
              <div className="flex items-center gap-4 py-4">
                <img
                  src={
                    instructor.image
                      ? instructor?.image
                      : `https://api.dicebear.com/5.x/initials/svg?seed=${instructor.firstName} ${instructor.lastName}`
                  }
                  alt="Author"
                  className="h-14 w-14 rounded-full object-cover"
                />
                <p className="text-lg">{`${instructor.firstName} ${instructor.lastName}`}</p>
              </div>
              <p className="text-richblack-50">
                {" "}
                {instructor?.additionalDetails?.about}{" "}
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />

      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </>
  );
}

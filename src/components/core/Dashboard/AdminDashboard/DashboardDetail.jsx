import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { hideLoading, showLoading } from "react-redux-loading-bar";
import {
  adminApproval,
  fetchAdminDashboard,
  instructorRejectApproval,
} from "../../../../services/operations/profileApi";
import { PiStudentDuotone } from "react-icons/pi";
import { FaChalkboardTeacher, FaDiscourse } from "react-icons/fa";
import { MdCurrencyRupee } from "react-icons/md";
import RatingStars from "../../../common/ReviewStars";
import IconBtn from "../../../common/IconButton";
import { useNavigate } from "react-router-dom";

export default function DashboardDetail() {
  const { token } = useSelector((state) => state.auth);
  const [adminData, setAdminData] = useState([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAdminDashboardData = async () => {
      setLoading(true);
      dispatch(showLoading());
      const adminDashboardStats = await fetchAdminDashboard(token);
      if (adminDashboardStats) {
        setAdminData(adminDashboardStats);
      }
      // console.log(adminData)
      setLoading(false);
      dispatch(hideLoading());
    };

    fetchAdminDashboardData();
  }, []);

  const InstructorRequest = adminData?.userInstructor?.filter(
    (user) => user.approved === false
  );

  // console.log("InstructorRequest",InstructorRequest)
  const handleOnClickApprove = async (data) => {
    setLoading(true);
    dispatch(showLoading());
    await adminApproval(data, token);
    const response = await fetchAdminDashboard(token);
    if (response) {
      setAdminData(response);
    }
    setLoading(false);
    dispatch(hideLoading());
  };
  
  const handleOnClickRejectRequest = async (data) => {
    setLoading(true);
    dispatch(showLoading());
    await instructorRejectApproval(data, token);
    const response = await fetchAdminDashboard(token);
    if (response) {
      setAdminData(response);
    }
    setLoading(false);
    dispatch(hideLoading());
  };

  return (
    <>
      {loading ? (
        <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
          <div className="spinner"></div>
        </div>
      ) : (
        <div className="text-white my-10">
          <h1 className="text-richblack-5 my-10 font-medium text-3xl ">
            Dashboard
          </h1>

          <div className="flex flex-col gap-4  mb-[5rem]  w-[100%] ">
            {/* section 1 */}
            <div className="flex flex-wrap gap-4 w-[100%] min-h-[10rem] items-center justify-center">
              {/* Students */}
              <div className="flex w-full lg:w-[24%] items-center justify-center h-[8rem] flex-col rounded-md bg-richblack-800 p-4 hover:text-richblack-200 duration-200 ">
                <span className="text-3xl">
                  {" "}
                  <PiStudentDuotone />
                </span>
                <p className="text-2xl flex justify-center items-center gap-4">
                  {" "}
                  <span> {adminData.userStudents} </span> Students
                </p>
              </div>
              {/* Instructors */}
              <div className="flex w-full lg:w-[24%] items-center justify-center h-[8rem] flex-col rounded-md bg-richblack-800 p-4 hover:text-richblack-200 duration-200 ">
                <span className="text-3xl">
                  {" "}
                  <FaChalkboardTeacher />
                </span>
                <p className="text-2xl flex justify-center items-center gap-4">
                  {adminData?.userInstructor?.length} Instructors
                </p>
              </div>
              {/* Courses */}
              <div className="flex w-full lg:w-[24%] items-center justify-center h-[8rem] flex-col rounded-md bg-richblack-800 p-4 hover:text-richblack-200 duration-200 ">
                <span className="text-3xl">
                  {" "}
                  <FaDiscourse />
                </span>
                <p className="text-2xl flex justify-center items-center gap-4">
                  {adminData?.totalCoursesCount} Total courses
                </p>
              </div>
              {/* Income */}
              <div className="flex w-full lg:w-[23%] items-center justify-center h-[8rem] flex-col rounded-md bg-richblack-800 p-4 hover:text-richblack-200 duration-200 ">
                <span className="flex text-2xl items-center">
                  <MdCurrencyRupee /> {adminData?.totalIncome}{" "}
                </span>
                <p className="text-2xl flex flex-col justify-center items-center gap-4">
                  Fees Collection
                </p>
              </div>
            </div>

            {/* Section 2 */}
            {/* Instructor pending request */}
            {InstructorRequest?.length > 0 && (
              <div className="w-full  bg-richblack-800 rounded-md">
                <div>
                  <h2 className="text-3xl font-medium text-richblack-5  p-6">
                    Pending Approval
                  </h2>
                  {InstructorRequest?.map((instructor, index) => (
                    <div
                      key={index}
                      className="flex flex-row w-[50%] gap-4 p-6  items-center pb-2 font-semibold text-richblack-5"
                    >
                      <img
                        src={instructor.image}
                        alt={"instructor"}
                        className="rounded-full h-16 w-16 object-cover"
                      />
                      <div className="flex flex-col">
                        <p className="text-richblack-5">
                          {instructor.firstName} {instructor.lastName}
                        </p>
                        <p className="text-richblack-600 text-sm">
                          {instructor.email}
                        </p>
                      </div>
                      <button
                        className="flex items-center  justify-center cursor-pointer gap-x-2 rounded-md py-2 px-5 font-semibold bg-richblack-300 hover:bg-richblack-400"
                        onClick={() =>
                          handleOnClickRejectRequest(instructor._id)
                        }
                      >
                        Reject
                      </button>
                      <IconBtn
                        text={"Approve"}
                        onclick={() => handleOnClickApprove(instructor._id)}
                      ></IconBtn>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* section 3 */}
            <div className="flex  md:flow-row  h-[22rem] gap-4 w-full">
              {/* Instructors list */}
              <div className="bg-richblack-800 hover:bg-richblack-700 rounded-md h-full overflow-auto w-full md:w-[50%] py-4 transition-colors">
                <h2 className="text-3xl font-medium text-richblack-5 p-4">
                  Instructors List
                </h2>
                {adminData?.userInstructor?.map((instructor, index) => (
                  <div
                    key={index}
                    className={` ${
                      instructor.approved === true ? "flex" : "hidden"
                    } flex-row gap-4 p-4 items-center border-b-[2px] border-dotted  border-b-richblack-400 pb-2 font-semibold text-richblack-5`}
                  >
                    <img
                      src={instructor.image}
                      alt={"instructor"}
                      className="rounded-full h-16 w-16 object-cover"
                    />
                    <div className="flex flex-col">
                      <p className="text-richblack-5">
                        {instructor.firstName} {instructor.lastName}
                      </p>
                      <p className="text-richblack-600 text-sm">
                        {instructor.email}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Students reviews */}
              <div className="md:w-[50%] w-full h-full overflow-auto overflow-x-hidden hover:bg-richblack-700 bg-richblack-800  transition-200 py-4 shadow-lg">
                <h3 className="text-3xl font-medium text-richblack-5 p-4">
                  Students Review
                </h3>
                {adminData?.ratingsAndReviews?.map((review, index) => (
                  <div
                    key={index}
                    className="flex flex-col  gap-4 px-4 border-b-[2px] border-dotted  border-richblack-400 pb-2 font-semibold text-richblack-5"
                  >
                    <div className="flex flex-wrap pt-4 md:flex-row items-start gap-4">
                      <img
                        src={review.user.image}
                        alt=""
                        className="h-10 w-10 rounded-full object-cover"
                      />
                      <div className="flex flex-col gap-1 justify-center ">
                        <p className="text-lg">
                          {review.user.firstName} {review.user.lastName}
                        </p>
                        <p className="text-sm text-richblack-600">
                          {review.user.email}
                        </p>
                      </div>
                      <RatingStars Review_Count={review.rating} />
                    </div>

                    <p className="w-full text-richblack-300 text-sm pb-4">
                      {review.review}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

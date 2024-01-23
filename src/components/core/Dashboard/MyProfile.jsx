import React from "react";
import IconButton from "../../common/IconButton";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FiEdit } from "react-icons/fi";

const MyProfile = () => {
  const { user } = useSelector((state) => state.profile);
  const navigate = useNavigate();

  return (
    <div>
      <div className="py-6 pr-20 pl-6">
        <h1 className="text-richblack-5 font-medium text-3xl ">My Profile</h1>
      </div>
      <div className="flex flex-col gap-4  mb-[5rem]  px-4 lg:items-center justify-center  w-[100%] ">
        {/* section1 */}
        <div className="relative flex mx-auto flex-col lg:flex-row gap-4  lg:items-center lg:justify-between p-4 rounded-lg border border-richblack-700 bg-richblack-700 w-full  lg:w-[700px]">
          <div className="flex flex-col items-center lg:flex-row gap-2">
            <img
              src={user.image}
              alt={`${user.firstName}`}
              className="h-14 w-14 rounded-full object-cover"
            />
            <div className="flex items-center lg:items-start  flex-col  ">
              <p className="text-richblack-5 font-semibold text-lg">{`${
                user.firstName
              }${" "} ${user.lastName}`}</p>
              <p className="text-richblack-300 text-sm">{user.email}</p>
            </div>
          </div>
          <IconButton
            text={"Edit"}
            onclick={() => navigate("/dashboard/settings")}
            customClasses={""}
          ><FiEdit/></IconButton>
        </div>

        {/* section2 */}
        <div className="relative p-4 rounded-lg border border-richblack-700 bg-richblack-700  lg:w-[700px]">
        <div className="flex justify-between">
            <p className="text-richblack-5 font-semibold text-lg">About</p>
            <IconButton
              text={"Edit"}
              onclick={() => navigate("/dashboard/settings")}
              customClassName={"bg-yellow-50  py-1  px-4 rounded-lg"}
              
            >
              <FiEdit/>
            </IconButton>
        </div>
        <div>
            <p className="text-richblack-300 text-sm">{`${user?.additionalDetails?.about??"Write something about your self"}`}</p>
        </div>
        </div>

        {/* Section 3 */}
        <div className="relative p-4 rounded-lg border border-richblack-700 bg-richblack-700 lg:w-[700px]">
          <div className="flex justify-between">
            <p className="text-richblack-5 font-semibold text-lg">Personal Details</p>
            <IconButton
              text={"Edit"}
              onclick={() => navigate("/dashboard/settings")}
              customClassName={"bg-yellow-50  py-1 px-4 rounded-lg"}
             
            ><FiEdit/></IconButton>
          </div>
          {/* Delete Account */}
          <div className="grid grid-rows-2 grid-cols-2 gap-2 text-richblack-5">
            <div className="flex flex-col">
                <p className="text-richblack-600 font-light text-sm">First Name</p>
                <p className="font-medium text-sm">{user.firstName}</p>
            </div>
            <div className="flex flex-col">
                <p className="text-richblack-600 font-light text-sm">Last Name</p>
                <p className="font-medium text-sm">{`${user.lastName??"Add your last Name"}`}</p>
            </div>
            <div className="flex flex-col">
                <p className="text-richblack-600 font-light text-sm">Email</p>
                <p className="font-medium text-sm">{user.email}</p>
            </div>
            <div className="flex flex-col">
                <p className="text-richblack-600 font-light text-sm">Phone Number</p>
                <p className="font-medium text-sm">{`${user?.additionalDetails?.contactNumber??"Add you Phone Number"}`}</p>
            </div>
            <div className="flex flex-col">
                <p className="text-richblack-600 font-light text-sm">Gender</p>
                <p className="font-medium text-sm">{`${user?.additionalDetails?.gender??"Add your gender"}`}</p>
            </div>
            <div className="flex flex-col">
                <p className="text-richblack-600 font-light text-sm">Date of Birth</p>
                <p className="font-medium text-sm">{`${user?.additionalDetails?.dateOfBirth??"Add you Date of Birth"}`}</p>
            </div>
          </div>
        <div>

        </div>
        </div>

      </div>
    </div>
  );
};

export default MyProfile;

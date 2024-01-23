import React from "react";

import ChangeProfilePicture from './PictureUpdate'
import EditProfileInfo from "./EditProfileInfo";
import UpdatePassword from "./UpdatePassword";
import DeleteProfile from "./DeleteProfile";

export default function ProfileSettings (){
   
  return (
    <>
        <h1 className="text-richblack-5 font-medium text-3xl my-10 ">Edit Profile</h1>
        <div className=" w-[80%] mx-auto">

        <ChangeProfilePicture/>
        <EditProfileInfo/>
        <UpdatePassword/>
        <DeleteProfile/>
        </div>
        
        
    </>
  )};


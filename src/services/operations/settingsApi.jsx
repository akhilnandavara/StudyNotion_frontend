import { apiConnector } from "../apiconnector";
import {setLoading} from '../../slices/authSlice'
import {setUser} from '../../slices/profileSlice'
import { settingsEndpoints } from "../apis";
import toast from "react-hot-toast";
import {logout} from '../operations/authApi'
import { hideLoading, showLoading } from "react-redux-loading-bar";

const {UPDATE_DISPLAY_PICTURE_API,UPDATE_PROFILE_API,CHANGE_PASSWORD_API,DELETE_PROFILE_API} = settingsEndpoints;



export function updateDisplayPicture(token,formData) {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await apiConnector(
        "PUT",
        UPDATE_DISPLAY_PICTURE_API,
        formData,
        {
          "Content-Type": "multipart/form-data",
          Authorization: `bearer ${token}`,
        },
      );

      // console.log("Profile update RESPONSE...", response);
      

      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      toast.success("Profile picture has been updated successfully");
      dispatch(setUser(response?.data?.data))

    } catch (error) {
      console.log("profile Update Error", error);
      toast.error(error.response.data.message)

    }
    dispatch(setLoading(false));
    
  };
}

export function updateProfile(token,data) {
  return async (dispatch) => {
    dispatch(showLoading())
    dispatch(setLoading(true));
    try {
      const response = await apiConnector(
        "PUT",
        UPDATE_PROFILE_API,
        data,
        {
          "Content-Type": "multipart/form-data",
          Authorization: `bearer ${token}`,
        },
      );

      // console.log("Profile update RESPONSE...", response);
      

      if (!response.data.success) {
        throw new Error(response.data.message);
      } 

      const userImage = response.data.updatedUserDetails.image ? response.data.updatedUserDetails.image : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.updatedUserDetails.firstName} ${response.data.updatedUserDetails.lastName}`

      toast.success("Profile  has been updated successfully");
      dispatch(setUser({...response.data.updatedUserDetails, image: userImage }))

      
    } catch (error) {
      console.log("profile Update Error", error);
      toast.error(error.response.data.message)
    }
    dispatch(setLoading(false));
    dispatch(hideLoading())
    
  };
}

export function changePassword(token,data) {
  
  return async () => {
    try {
      const response = await apiConnector(
        "POST",
        CHANGE_PASSWORD_API,
        data,
        {
          "Content-Type": "multipart/form-data",
          Authorization: `bearer ${token}`,
        },
      );

      console.log("Password update RESPONSE...", response);
      

      if (!response.data.success) {
        toast.error(response.data.message)
        throw new Error(response.data.message)
      }
      toast.success("Password  has been updated successfully");
    } catch (error) {
      console.log("Password Update Error", error);
      toast.error(error.response.data.message);
    }
    
  };
}

export function deleteProfile(token,navigate) {
  return async (dispatch) => {
    try {
      dispatch(showLoading())
      const response = await apiConnector("DELETE",DELETE_PROFILE_API,null,{  Authorization: `bearer ${token}`, },
      );

      // console.log("profile Delete RESPONSE...", response);
      
      if (!response.data.success) {
        toast.error(response.data.message)
        throw new Error(response.data.message)
      }
      toast.success("Profile  has been Deleted  successfully");
      dispatch(logout(navigate))

    } catch (error) {
      console.log("Profile delete Error", error);
      toast.error(error.response.data.message);
    }
    dispatch(hideLoading())
  };
}

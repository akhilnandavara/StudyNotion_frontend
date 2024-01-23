import { profileEndpoints } from "../apis";
import { apiConnector } from "../apiconnector";
import toast from "react-hot-toast";

function timeout( delay) {
  return new Promise( res => setTimeout(res, delay) );
}

const { GET_USER_ENROLLED_COURSES_API, GET_INSTRUCTOR_DATA_API,GET_ADMIN_DATA_API ,ADMIN_APPROVAL_API,ADMIN_RJECT_API} =profileEndpoints;

export const fetchEnrolledCourses = async (token) => {
  
  try {
    const response = await apiConnector(
      "GET",
      GET_USER_ENROLLED_COURSES_API,
      null,
      {
        Authorization: `bearer ${token}`,
      }
    );

    if (!response.data.success) {
      throw new Error(response.data.message);
    }
    // console.log("Enrolled course response ", response?.data?.data);

    return response?.data?.data;
    
  } catch (error) {
    console.log("Enrolled Course error ", error);
    toast.error(error.response.data.message);
  }
};

// Instructor Dashboard data
export const fetchInstructorDashboard = async (token) => {
  let result = [];
  try {
    const response = await apiConnector("GET", GET_INSTRUCTOR_DATA_API, null, {
      Authorization: `bearer ${token}`,
    });

    if (!response.data.success) {
      throw new Error(response.data.message);
    }
    console.log("Instructor Dashboard response ", response?.data?.courses);
    result = response.data.courses;
  } catch (error) {
    console.log("Instructor Dashboard error ", error);
    toast.error(error.response);
  }
  return result;
};

// Admin Dashboard data
export const fetchAdminDashboard = async (token) => {
  let result = [];
  try {
    const response = await apiConnector("GET", GET_ADMIN_DATA_API, null, {
      Authorization: `bearer ${token}`,
    });

    if (!response.data.success) {
      throw new Error(response.data.message);
    }
    // console.log("Admin Dashboard response ", response?.data?.data);
    result = response.data.data;
  } catch (error) {
    console.log("Admin Dashboard error ", error);
    toast.error(error.response);
  }
  return result;
};

// Instructor pending request Approval
export const adminApproval=async(instructorId,token)=>{
  let toastId
  try {
    
    const response=await apiConnector("PUT",ADMIN_APPROVAL_API,{instructorId},{Authorization:`bearer ${token}`})
    console.log("ADMIN INSTRUCTOR APPROVAL RESONSE ........",response)
    if(!response?.data.success){
      throw new Error("Could not approve instructor")
    }
    toastId=toast.success("Instructor  Approved Successfully")
  }
   catch (error) {
    console.log("ADMIN INSTRUCTOR APPROVAL API ERROR............", error)
    toastId=toast.error(error.response?.data?.message)
  }
  await timeout(1000); 
  toast.dismiss(toastId)
}  

// Instructor pending request Reject
export const instructorRejectApproval=async(instructorId,token)=>{
  let toastId
  try {
    
    const response=await apiConnector("DELETE",ADMIN_RJECT_API,{instructorId},{Authorization:`bearer ${token}`})
    console.log("ADMIN INSTRUCTOR REQUEST REJECT RESONSE ........",response)
    if(!response?.data.success){
      throw new Error("Could not Reject instructor approval request")
    }
    toastId=toast.success("Instructor  request Rejected Successfully")
  }
   catch (error) {
    console.log("ADMIN INSTRUCTOR APPROVAL REJECT API ERROR............", error)
    toastId=toast.error(error.response?.data?.message)
  }
  await timeout(1000); 
  toast.dismiss(toastId)
}  
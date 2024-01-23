import toast from "react-hot-toast"
import { apiConnector } from "../apiconnector"
import { categories } from "../apis"

function timeout( delay) {
  return new Promise( res => setTimeout(res, delay) );
}

const {CREATE_CATEGORIES_API}=categories
// add the course details
export const createCategory = async (data, token) => {
    let toastId
    try {
      const response = await apiConnector("POST", CREATE_CATEGORIES_API, data,  { Authorization: `bearer ${token}`,} )
      console.log("CREATE CATEGORY API RESPONSE............", response)
  
      if (!response?.data?.success) {
        throw new Error("Could Not Add Category")

      }
       toastId=toast.success("Course Category Added Successfully")
    }
     catch (error) {
      console.log("CREATE CATEGORY API ERROR............", error)
      toastId=toast.error(error.response?.data?.message)
    }
    await timeout(1000); 
    toast.dismiss(toastId)

}


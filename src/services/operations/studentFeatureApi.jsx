import toast from "react-hot-toast";
import { studentEndpoints } from "../apis";
import { apiConnector } from "../apiconnector";
import rzpLogo from "../../assets/Logo/rzp_logo.png"
import { setPaymentLoading } from "../../slices/courseSlice";
import { resetCart } from "../../slices/cartSlice";
import { hideLoading, showLoading } from "react-redux-loading-bar";


const {
  COURSE_PAYMENT_API,
  COURSE_VERIFY_API,
  SEND_PAYMENT_SUCCESS_EMAIL_API,
  COURSE_CREATE_PAYMENT_HISTORY,
  GET_PAYMENT_HISTORY,
} = studentEndpoints;

function loadScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;

    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
}

export async function buyCourse(
  token,
  userDetails,
  courses,
  navigate,
  dispatch,
) {
  dispatch(showLoading())
  try {
    // load  script
    const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js")
      if (!res) {
        toast.error("Failed to load RazorPay SDK");
      }
      // initate order
      const orderResponse = await apiConnector(
      "POST",
      COURSE_PAYMENT_API,
      courses,
      {
        Authorization: `bearer ${token}`,
      }
    );
    
    
    if (!orderResponse.data.success) {
      toast.error(orderResponse.data.message)
      throw new Error(orderResponse.data.message);
    }
    // console.log("Order Response...",orderResponse)
    //options
    const options = {
      key:process.env.REACT_APP_RAZORPAY_KEY,
      currency: orderResponse.data.message.currency,
      amount: `${orderResponse.data.message.amount}`,
      order_id:orderResponse.data.message.id,
      name:"StudyNotion",
      description:"Thank You for Purchasing the Course",
      image:rzpLogo,
      prefill: {
          name:`${userDetails.firstName}`,
          email:userDetails.email,    
      },
      handler: function(response) {
          //send successful wala mail
          sendPaymentSuccessEmail(response,orderResponse.data.message.amount,token);
          //verifyPayment
          verifyPayment({...response, courses}, token, navigate, dispatch);
          createPaymentHistory(response,orderResponse.data.message.amount,token);
      }
  }

    const paymentObject=new window.Razorpay(options);
    paymentObject.on("payment.failed",function(reponse){
      toast.error("Payment Failed");
      console.log(reponse.error)
    })
    paymentObject.open()

  } catch (error) {
    console.log("PAYMENT API ERROR....", error);
    // toast.error("could not purchase a coures");
  }
  dispatch(hideLoading())

}


// Send payment success mail
const sendPaymentSuccessEmail = async (response, amount, token) => {
  try {
    await apiConnector(
      "POST",
      SEND_PAYMENT_SUCCESS_EMAIL_API,
      {
        orderId: response.razorpay_order_id,
        paymentId: response.razorpay_payment_id,
        amount,
      },
      {
        Authorization: `bearer ${token}`,
      }
    );
  } catch (error) {
    console.log("ERROR IN SEND PAYMENT SUCCESS MAIL..", error);
  }
};

// Verify Payment
const verifyPayment = async (bodyData, token, navigate, dispatch) => {
  const toastId = toast.loading("Verifying payment");
  dispatch(setPaymentLoading(true));

  try {
    const response = await apiConnector(
      "POST",
      COURSE_VERIFY_API,
      bodyData ,
      { Authorization: `bearer ${token}` }
      );
      
    if (!response.data.success) {
      throw new Error(response.data.message);
    }
    
    toast.success("Course is added to your profile");
    dispatch(resetCart());
    navigate("/dashboard/enrolled-courses");

  } catch (error) {
    console.log("Payment Verify Error..",error);
    toast.error("Could not verify a payment")
  }
  toast.dismiss(toastId);
  dispatch(setPaymentLoading(false));
};

// Verify Payment
const createPaymentHistory = async (response, amount, token) => {
  try {
    const paymentHistory = await apiConnector(
      "POST",
      COURSE_CREATE_PAYMENT_HISTORY,
      {
        orderId: response.razorpay_order_id,
        amount,
        status:"Created"
      },
      
      { Authorization: `bearer ${token}` }
      );
      
    if (!paymentHistory.data.success) {
      throw new Error(paymentHistory.data.message);
    }
    
  } catch (error) {
    console.log(" Create payment History Error..",error);
  }
};

// fetching all courses under a specific instructor
export const getPaymentHistory = async (token) => {
  let result = []
  try {
    const response = await apiConnector( "GET",GET_PAYMENT_HISTORY, null, {Authorization: `bearer ${token}`,} )
    console.log("PAYMENT HISTORY API RESPONSE............", response)

    if(!response?.data?.success) {
      throw new Error("Could Not Fetch Payment History")
    }
    result = response?.data?.data
  }
   catch (error) {
    console.log("PAYMENT API ERROR............", error)
    toast.error(error.response.data.message)
  }
  return result
}
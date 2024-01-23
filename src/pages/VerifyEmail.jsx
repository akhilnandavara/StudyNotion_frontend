import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import OtpInput from "react-otp-input";
import { Link, useNavigate } from "react-router-dom";
import {BsArrowLeft} from 'react-icons/bs'
import {RxCountdownTimer} from 'react-icons/rx'
import { sendOtp, signUp } from "../services/operations/authApi";

const VerifyEmail = () => {
  const [otp, setOtp] = useState("");
  const { signUpData ,loading } = useSelector((state) => state.auth);
  const dispatch=useDispatch();
  const navigate=useNavigate()

  if(!signUpData){
    console.log("SignUP Data not found")
    navigate("/signup")
  }
  const handleOnSubmit=(e)=>
  {  e.preventDefault();
    const {accountType, firstName, lastName, email, password, confirmPassword}=signUpData

    dispatch(signUp(accountType, firstName, lastName, email, password, confirmPassword,  otp, navigate))

  }
  return (
    <div className="  mx-auto my-auto">
      {loading ? (
        <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
        <div className="spinner"></div>
      </div>  
      ) : (
        
        <div className="text-richblack-5  font-inter flex flex-col gap-4">
          <h1 className="text-[1.875rem] font-semibold leading-[2.375rem] ">Verify email</h1>
          <p className="text-richblack-100 text-lg font-light">A verification code has been sent to you. Enter the code below</p>

          <form onSubmit={handleOnSubmit} >
          <OtpInput 
          value={otp} 
          onChange={setOtp} 
          numInputs={4}                      // this otp box conatiner is copied from internet  
          renderInput = {(props) => (
                    <input {...props}  placeholder="-"  
                    style={{boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",}}  
                    className="w-[40px] lg:w-[60px] border-0 bg-richblack-800 rounded-[0.5rem]
                                 text-richblack-5 aspect-square text-center focus:border-0 focus:outline-2 focus:outline-yellow-50"  />
                        )}
                  containerStyle = {{ justifyContent: "space-around", gap: "0 6px"  }} 
                />
            
            <button type="submit" className="w-full bg-yellow-50 py-[12px] px-[12px] rounded-[8px] mt-6 font-medium text-richblack-900">
            
            Verify email
            
            </button>
          </form>
          <div className="flex justify-between">
          <button>  
            <Link to="/login" className='flex items-center gap-1'>
                <BsArrowLeft/>   
            Back to login
            </Link>
        </button>
        <button onClick={()=>dispatch(sendOtp(signUpData.email,navigate))} className="flex gap-2 items-center text-blue-200">
          <RxCountdownTimer />
            Resend it
        </button>
          </div>
        </div>
      
      )}
    </div>
  );
};

export default VerifyEmail;

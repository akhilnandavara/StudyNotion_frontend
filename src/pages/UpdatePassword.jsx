import React, { useState } from "react";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword } from "../services/operations/authApi";
import { useLocation, useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom'
import {BsArrowLeft} from 'react-icons/bs'

const UpdatePassword = () => {
  const { loading } = useSelector((state)=>state.auth);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const dispatch=useDispatch();
  const location=useLocation();
  const navigate=useNavigate();
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword:"",
  });
  const { password, confirmPassword} = formData;
  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };
const handleOnSubmit=(e)=>{
    e.preventDefault();
    const token= location.pathname.split("/").at(-1)
    dispatch(resetPassword(password,confirmPassword,token,navigate))  
}

  return (
    <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center text-richblack-5">
      {loading ? (
        <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
        <div className="spinner"></div>
      </div>  
      ) : (
        <div className="w-[50%] lg:w-[444px] lg:h-[128px] flex flex-col gap-4">
          <div>
            <h1 className="text-[1.875rem] font-semibold leading-[2.375rem] text-richblack-5">Choose new password</h1>
            <p className="text-richblack-100 font-medium text-lg ">Almost done. Enter your new password and youre all set</p>
          </div>

          <form onSubmit={handleOnSubmit} >
            {/* new Password */}
            <label className="relative">
              <p>
                New password <sup className="text-[red]">*</sup>
              </p>
              <input
              required
                type={`${showPassword ? "text" : "password"}`}
                name="password"
                value={password}
                onChange={handleOnChange}
                placeholder="password"
                className="bg-[#161D29] rounded-lg p-4 my-4 w-full"
              />
               <span onClick={() => setShowPassword((prev) => !prev)} className="absolute -bottom-1 right-2">
                {showPassword ? (
                  <AiFillEyeInvisible fontSize={24} />
                ) : (
                  <AiFillEye fontSize={24} />
                )}
              </span>
            </label>
            {/* Confirm Password */}
            <label className="relative">
              <p>
                Confirm password <sup className="text-[red]">*</sup>
              </p>
              <input
              required
                type={`${showConfirmPassword ? "text" : "password"}`}
                name="confirmPassword"
                value={confirmPassword}
                onChange={handleOnChange}
                placeholder="Confirm password"
                className="bg-[#161D29] rounded-lg p-4 my-4 w-full"
              />
              <span onClick={() => setShowConfirmPassword((prev) => !prev)} className="absolute -bottom-1 right-2">
                {showConfirmPassword ? (
                  <AiFillEyeInvisible fontSize={24} />
                ) : (
                  <AiFillEye fontSize={24} />
                )}
              </span>
            </label>
            <button type="submit" className="w-full bg-yellow-50 py-[12px] px-[12px] rounded-[8px] mt-6 font-medium text-richblack-900">Reset Password</button>
          </form>
          <button>  
            <Link to="/login" className='flex items-center gap-1 mt-2'>
                <BsArrowLeft/>
            Back to login
            </Link>
        </button>
        </div>
      )}
    </div>
  );
};

export default UpdatePassword;

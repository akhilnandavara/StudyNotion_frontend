import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import {BsArrowLeft} from 'react-icons/bs'
import {getPasswordResetToken} from '../services/operations/authApi'
const ForgotPassword = () => {
    const {loading}=useSelector((state)=>state.auth)
    const [emailSent,setEmailSent]=useState(false)
    const [email,setEmail]=useState("");
    const dispatch=useDispatch()

    const handleOnSubmit=(e)=>{
        e.preventDefault()
        dispatch(getPasswordResetToken(email,setEmailSent))
    }

  return (
  
    <div className='grid min-h-[calc(100vh-3.5rem)] place-items-center text-richblack-5'>{
      
    loading?(<div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
    <div className="spinner"></div>
  </div>   ) :(
      <div className='w-[50%] lg:w-[444px] lg:h-[128px] flex flex-col gap-4'>
      <h1 className="text-[1.875rem] font-semibold leading-[2.375rem] text-richblack-5">
        {
            emailSent?"Check email":"Reset your password"
        }
      </h1>
      <p  className="text-richblack-100 font-medium text-lg  whitespace-pre-line ">
        {
            emailSent?
            `We have sent the reset 
            email to ${email}`:
            "Have no fear. We’ll email you instructions to reset your password. If you dont have access to your email we can try account recovery"
        }
      </p>
      <form onSubmit={handleOnSubmit}>
        {
            !emailSent&&
        <label>
            <p className='my-2'>Email Adress <sup className='text-[red]'>*</sup></p>
            <input
            required
             type="email"
             name="email"
             value={email}
             onChange={(e)=>setEmail(e.target.value)}
             placeholder='Enter your email'
             className='bg-[#161D29] rounded-lg p-4  w-full'
              />
              
        </label>
        }
        
        <button  type="submit" className='w-full bg-yellow-50 py-[12px] px-[12px] rounded-[8px] mt-6 font-medium text-richblack-900'>
            {
                emailSent?"Resend email":"Reset Password"
            }
        </button>  
      </form>
        <button>  
            <Link to="/login" className='flex items-center gap-1 mt-2'>
                <BsArrowLeft/>
            Back to login
            </Link>
        </button>
    </div>
    )
          }
    </div>
  )
}

export default ForgotPassword

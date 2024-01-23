import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { apiConnector } from "../../services/apiconnector";
import { contactusEndpoint } from "../../services/apis";
import countryCode from '../../data/countrycode.json'
import toast from "react-hot-toast";

const ContactUsForm = () => {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm();

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        email: "",
        firstName: "",
        lastName: "",
        message: "",
        phoneNo: "",
      });
    }
  }, [reset, isSubmitSuccessful]);

  const submitContactForm = async (data) => {
    // console.log(data);
    setLoading(true);
    try {
      const response = await apiConnector(
        "POST",
        contactusEndpoint.CONTACT_US_API,
        {data}
      );
      console.log("Contact form Response", response);
      toast.success(response?.data.message)
      setLoading(false);
    } catch (error) {
      console.log("failed to submit a form ", error.message);
      setLoading(false);
    }
  };

  return (
    <div>
      {loading ? (
        <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
        <div className="spinner"></div>
      </div>  
      ) : (
        <form onSubmit={handleSubmit(submitContactForm)}>
          
          <div className=" flex flex-col gap-6 p-8 rounded-lg border border-richblack-700  ">
          <div className="flex flex-col gap-4">
            <h1 className="text-richblack-5 font-bold text-4xl lg:w-[590px] lg:h-[88px]">Got a Idea? We’ve got the skills.  Let’s team up</h1>
            <p className="text-richblack-300 font-medium text-sm ">Tell us more about yourself and what you’re got in mind.</p>
          </div> 

          <div className="flex flex-col  gap-6">
            {/* name field */}
            <div className="flex flex-col lg:flex-row gap-4">
              {/* first Name */}
              <div className="flex flex-col font-light text-sm lg:w-[50%] gap-2">
                <label htmlFor="firstName" className="lable-style">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  id="firstName"
                  placeholder="Enter First name"
                  className="bg-richblack-800 p-3 rounded-md drop-shadow-[0px_1px_#FFFFFF2E] form-style"
                  {...register("firstName", { required: true })}
                />
                {errors.firstName && (
                  <span className="text-[#a51f1f]">Please enter your name</span>
                )}
              </div>

              {/* Last Name */}
              <div className="flex flex-col lg:w-[50%] font-light text-sm gap-2 ">
                <label htmlFor="lastName" className="lable-style">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  id="lastName"
                  placeholder="Enter last name"
                  className="bg-richblack-800 p-3 rounded-md drop-shadow-[0px_1px_#FFFFFF2E] form-style"
                  {...register("lastName")}
                />
              </div>
            </div>
            {/* email field */}
            <div className="flex flex-col text-sm gap-2">
              <label htmlFor="email" className="lable-style">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Enter your email"
                className="bg-richblack-800 p-3 rounded-md drop-shadow-[0px_1px_#FFFFFF2E] form-style"
                {...register("email", { required: true })}
              />
              {errors.email && (
                <span className="text-[#a51f1f]">Please Enter your email </span>
              )}
            </div>
            {/* Phone Number */}
            <div className="flex flex-col gap-2  ">
                <label htmlFor="number" className="lable-style">Phone Number</label>
                <div className="flex flex-row gap-2">
                    {/* dropdown  */}
                        <select 
                        name="dropdown" 
                        id="dropdown"
                        className={`bg-richblack-800 max-w-[80px] p-3 rounded-md drop-shadow-[0px_1px_#FFFFFF2E] form-style`}
                        {...register("countryCode",{required:true})}>
                            {
                             countryCode.map((ele,index)=>(
                                <option key={index} value={ele.code} >
                                    {ele.code} -{ele.country}
                                </option>
                             ))   
                            }
                        </select>                     
                    {/* number */}
                  
                        <input 
                        type="tel"
                        name="number"
                        id="number"
                        placeholder="9513118901" 
                       
                        className="bg-richblack-800 w-[calc(100%-90px)] text-richblack-5 p-3 rounded-md drop-shadow-[0px_1px_#FFFFFF2E] "
                        {...register("phoneNo",{
                            required:{value:true,message:"Please enter your phone number"},
                            maxLength:{value:10,message:"Invalid number"},
                            minLength:{value:8,message:"Invaild Number"},

                        })}
                        />
                        
                </div>
                        {
                          errors.phoneNo&&(<span className="text-[#a51f1f]">{errors.phoneNo.message}</span>)
                        }
            </div>
            
            {/* message field */}
            <div className="flex flex-col text-sm gap-2 ">
              <label htmlFor="message" className="lable-style">Message</label>
              <textarea
                name="message"
                id="message"
                cols="30"
                rows="10"
                placeholder="Enter your message here"
                className="bg-richblack-800 p-3 rounded-md drop-shadow-[0px_1px_#FFFFFF2E] form-style"
                {...register("message", { required: true })}
              />
              {errors.message && (
                <span className="text-[red]">Please enter your message</span>
              )}
            </div>
            {/* send message button */}
            <button
              type="submit"
              className="text-center text-[13px] px-6 py-3  rounded-md font-bold bg-yellow-100 text-richblack-900"
            >
              Send Message
            </button>
          </div>

          </div>
        </form>
      )}
    </div>
  );
};

export default ContactUsForm;

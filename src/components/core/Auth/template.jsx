import { useDispatch, useSelector } from "react-redux";

import frameImg from "../../../assets/Images/frame.png";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import { useState } from "react";
import { login } from "../../../services/operations/authApi";
import { BiRadioCircleMarked } from "react-icons/bi";
import { RiArrowRightDoubleFill } from "react-icons/ri";
import { BsLightningChargeFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

function Template({ title, description1, description2, image, formType }) {
  const { loading } = useSelector((state) => state.auth);
  const [showDemoCredential, setShowDemoCredential] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleDemoLogin(email, password, navigate) {
    // e.preventDefault();
    dispatch(login(email, password, navigate));
  }

  return (
    <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
      {loading ? (
        <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
          <div className="spinner"></div>
        </div>
      ) : (
        <div className="mx-auto flex w-11/12 max-w-maxContent flex-col-reverse justify-between gap-y-12 py-12 md:flex-row md:gap-y-0 md:gap-x-12">
          <div className="mx-auto w-11/12 max-w-[450px] md:mx-0">
            <h1 className="text-[1.875rem] font-semibold leading-[2.375rem] text-richblack-5">
              {" "}
              {title}{" "}
            </h1>
            <p className="mt-4 text-[1.125rem] leading-[1.625rem]">
              <span className="text-richblack-100">{description1}</span>{" "}
              <span className="font-edu-sa font-bold italic text-blue-100">
                {" "}
                {description2}{" "}
              </span>
            </p>

            {formType === "signup" ? <SignupForm /> : <LoginForm />}
          </div>

          <div className="relative mx-auto w-11/12 max-w-[450px] md:mx-0">
            <img
              src={frameImg}
              alt="Pattern"
              width={558}
              height={504}
              loading="lazy"
            />{" "}
            {/* image of bg-cart */}
            <img
              src={image}
              alt="Students"
              width={558}
              height={490}
              loading="lazy"
              className="absolute -top-4 right-4 z-10"
            />{" "}
            {/* image of girl */}
          </div>

             {/* Demo Credential */}
          <div className={`${showDemoCredential ? "absolute" : "hidden"} z-[2000]  top-20 left-10  md:top-[30%] md:left-[30%]  2xl:top-[50%] 2xl:left-[50%] md:-rotate-12 p-2 w-[13rem]  md:w-[20rem] bg-richblack-400 rounded-sm`}
          >
             <button onClick={() => setShowDemoCredential(false)} className="absolute right-0 top-0">
                <BiRadioCircleMarked size={30} className=" text-richblack-5  " />
              </button>
              
            <div className="flex flex-col gap-4 p-4">
              <div className="text-richblack-5  flex  items-center gap-1 md:gap-4 font-extrabold">
              <h2 className="text-2xl">Take a Demo</h2>
              <span><BsLightningChargeFill/></span> 
              </div>

             
            {/* Buttons */}
            <div className="flex flex-col gap-4 w-fit ">
              <button
                className="bg-yellow-50 text-richblack-900 p-2  font-bold rounded-md flex items-center"
                onClick={() =>
                  handleDemoLogin(
                    process.env.REACT_APP_DEMO_INSTRUCTOR_MAIL,
                    process.env.REACT_APP_DEMO_INSTRUCTOR_PASS,
                    navigate)
                }
              >
                <span className="hidden md:block"><RiArrowRightDoubleFill size={20}/></span> Click here for Instructor Demo
              </button>
              <button
                className="bg-yellow-50 text-richblack-900 p-2  font-bold rounded-md flex items-center"
                onClick={() =>
                  handleDemoLogin(
                    process.env.REACT_APP_DEMO_STUDENT_MAIL,
                    process.env.REACT_APP_DEMO_STUDENT_PASS,
                    navigate
                  )
                }
              >
              <span className="hidden md:block"><RiArrowRightDoubleFill size={20}/></span>Click here for Student Demo
              </button>

              <button
                className="bg-yellow-50 text-richblack-900 p-2  font-bold rounded-md flex items-center"
                onClick={() =>
                  handleDemoLogin(
                    process.env.REACT_APP_DEMO_ADMIN_MAIL,
                    process.env.REACT_APP_DEMO_ADMIN_PASS,
                    navigate
                  )
                }
              >
              <span className="hidden md:block"><RiArrowRightDoubleFill size={20}/></span>Click here for Admin Demo
              </button>
            </div>
            </div>
          </div>
          
       
        </div>
      )}
    </div>
  );
}

export default Template;

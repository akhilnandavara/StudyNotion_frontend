import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import HighLigthText from "../components/core/HomePage/HighLightText";
import CTAButton from "../components/core/HomePage/button";
import banner from "../assets/Images/banner.mp4";
import CodeBlocks from "../components/core/HomePage/CodeBlocks";
import TimeSection from "../components/core/HomePage/TimeSection";
import CalenderSection from "../components/core/HomePage/CalenderSection";
import InstructorSection from "../components/core/HomePage/InstructorSection";
import ExploreMore from "../components/core/HomePage/ExploreMore";
import Footer from "../components/common/Footer";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../services/operations/authApi";
import ReviewSlider from "./ReviewSlider";

const Home = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.profile);
  const navigate = useNavigate();
  useEffect(() => {
    // console.log(Date.now()>user?.expiresIn)
    if (Date.now() > user?.expiresIn) {
      dispatch(logout(navigate));
    }
  }, []);

  return (
    <div>
      {/* section 1 */}
      <section className="w-11/12 max-w-maxContent  flex flex-col items-center  mx-auto  text-white gap-5">
        <Link to={"/signup"}>
          <div
            className=" group mt-16 p-1 bg-richblack-800 mx-auto  rounded-full
             text-richblack-200 font-bold transition-all duration-200 hover:scale-95 w-fit "
          >
            <div
              className="flex flex-row items-center gap-2 rounded-full px-10 
                    py-[5px] transition-all duration-200 group-hover:bg-richblack-900"
            >
              <p>Become a instructor</p>
              <FaArrowRight />
            </div>
          </div>
        </Link>

        {/*Empower your future block  */}
        <div className=" mt-7  lg:text-center max-w-[913px]">
          <div className=" text-4xl font-semibold py-4 ">
            Empower Your Future with <HighLigthText text="Coding Skills" />
          </div>
          <div className="text-richblack-500  lg:text-center font-semibold  ">
            With our online coding courses, you can learn at your own pace, from
            anywhere in the world, and get access to a wealth of resources,
            including hands-on projects, quizzes, and personalized feedback from
            instructors.{" "}
          </div>
        </div>
        <div className="flex flex-row gap-1 mt-8">
          <CTAButton active={true} linkto={"/signup"}>
            Learn More
          </CTAButton>
          <CTAButton active={false} linkto={"/login"}>
            Book a Demo
          </CTAButton>
        </div>
        {/* banner video */}
        <div className="mx-3 my-7  relative shadow-[-10px_-5px_50px_-5px] shadow-blue-200">
          <video
            muted
            autoPlay
            loop
            className="shadow-[20px_20px_rgba(255,255,255)] object-cover"
          >
            <source src={banner} type="video/mp4" />
          </video>
        </div>

        {/*  Code Section  animation 1*/}
        <div>
          <CodeBlocks
            position={"lg:flex-row"}
            heading={
              <div className="font-bold text-4xl">
                Unlock your
                <HighLigthText text={" coding potential "} />
                with our online courses
              </div>
            }
            subHeading={
              "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
            }
            ctabtn1={{
              btnText: "Try it Yourself",
              linkto: "/signup",
              active: true,
            }}
            ctabtn2={{
              btnText: "Learn More",
              linkto: "/signup",
              active: false,
            }}
            codeBlock={`<!DOCTYPE html>\n<html>\n<head>\n<title>Example</title>\n<link rel="stylesheet"href="styles.css">\n/head>\nh1><ahref="/">Header</a></h1>\n<nav>\n<a href="one/">One</a><ahref="two/">Two</a><ahref="three/">Three</a>\n</nav>`}
            codeColor="text-yellow-25"
            codebg={<div className="codeblock1 absolute"></div>}
          />
        </div>

        {/* Code animation section 2 */}
        <div>
          <CodeBlocks
            position={"lg:flex-row-reverse"}
            heading={
              <div className="font-bold text-4xl">
                Start
                <HighLigthText text={" coding in seconds"} />
              </div>
            }
            subHeading={
              "Go head,give it a try. Our hands-on learning environment means you'll be writing code from very first leasson"
            }
            ctabtn1={{
              btnText: "Continue Lesson",
              linkto: "/signup",
              active: true,
            }}
            ctabtn2={{
              btnText: "Learn More",
              linkto: "/signup",
              active: false,
            }}
            codeBlock={`import React from "react";\nimport CTAButton from "./Button";\nimport TypeAnimation from "react-type";\nimport { FaArrowRight } from "react-icons/fa";\n\nconst Home = () => {\nreturn (\n<div>Home</div>\n)\n}\nexport default Home`}
            codeColor="text-white"
            codebg={<div className="codeblock2 absolute"></div>}
          />
        </div>
        <ExploreMore />
      </section>

      {/* section 2 */}
      <section className="bg-pure-greys-5 text-richblack-700">
        <div className="homepage_bg h-[220px]">
          <div className="w-11/12 max-w-maxContent mx-auto flex flex-col items-center ">
            <div className="h-[150px]"></div>
            <div className="flex flex-row gap-4">
              <CTAButton active={true} linkto={"/catalog/web-development"}>
                <div className="flex items-center gap-1">
                  Explore All category
                  <FaArrowRight />
                </div>
              </CTAButton>
              <CTAButton active={false} linkto={"/signup"}>
                Learn More
              </CTAButton>
            </div>
          </div>
        </div>

        <div className="w-11/12 max-w-maxContent mx-auto flex flex-col items-center gap-5">
          <div className="flex flex-col lg:flex-row gap-5 mb-10 mt-[95px]">
            <div className="text-4xl font-semibold lg:w-[50%]">
              Get the skills you need
              <HighLigthText text={" for a job that is in demand."} />
            </div>

            <div className="flex flex-col gap-10  lg:w-[40%] items-start">
              <div>
                The modern StudyNotion is the dictates its own terms. Today, to
                be a competitive specialist requires more than professional
                skills.
              </div>
              <div className="w-[130px] h-[48px]">
                <CTAButton active={true} linkto={"/signup"}>
                  Learn More
                </CTAButton>
              </div>
            </div>
          </div>
          <TimeSection />
          <CalenderSection />
        </div>
      </section>

      {/* section 3 */}
      <section className="relative mx-auto my-20 flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-8 bg-richblack-900 text-white">
        <InstructorSection />
        <h1 className="text-center text-4xl font-semibold mt-8">Reviews of other learners</h1>
        {/* Review Slider */}
        <div className="w-11/12 mx-auto"><ReviewSlider /></div>
      </section>

      {/* Footer */}
        <Footer />

    </div>
  );
};

export default Home;

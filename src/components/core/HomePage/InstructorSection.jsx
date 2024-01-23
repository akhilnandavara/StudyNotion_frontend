import React from "react";
import instructorImg from "../../../assets/Images/Instructor.png";
import HighLightText from "./HighLightText";
import CTAButton from "./button";
import { FaArrowRight } from "react-icons/fa";

const InstructorSection = () => {
  return (
    <div>
      <div className="flex flex-col-reverse lg:flex-row  items-center gap-12">
        <div className="lg:w-[50%] ">
          <img
            src={instructorImg}
            alt="instructorImage"
            className="lg:shadow-[-20px_-20px_rgba(255,255,255)]"
          />
        </div>
        <div className="flex flex-col  gap-5 lg:w-[50%]">
          <div className="text-white font-semibold text-4xl w-[50%] ">
            Become an <HighLightText text={"instructor"} />
          </div>
          <div className="text-richblack-300 text-lg w-[90%]">
            Instructors from around the world teach millions of students on
            StudyNotion. We provide the tools and skills to teach what you love.
          </div>
          <div className="w-fit pt-[50px] ">
            <CTAButton active={true} linkto={"/signup"}>
              <div className="flex flex-row items-center gap-2">
                Start Teaching Today
                <FaArrowRight />
              </div>
            </CTAButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstructorSection;

import React from "react";
import HighLightText from "./HighLightText";
import knowYourProgressImg from "../../../assets/Images/Know_your_progress.png";
import comareWithOthersImg from "../../../assets/Images/Compare_with_others.png";
import PlanYourLessonsImg from "../../../assets/Images/Plan_your_lessons.png";
import CTAButtion from './button'

const CalenderSection = () => {
  return (
    <div className=" flex flex-col items-center mt-[150px] ">
      <div className="flex flex-col  text-center gap-10">
        <div className="text-4xl  font-semibold ">
          Your swiss knife for <HighLightText text={"learning any language"} />
        </div>
        <div className="text-richblack-600 mx-auto text-base w-[70%]">
          Using spin making learning multiple languages easy. with 20+ languages
          realistic voice-over, progress tracking, custom schedule and more.
        </div>
      </div>
      <div className="flex flex-col lg:flex-row mt-5 justify-center items-center">
        <img
          src={knowYourProgressImg}
          alt="knowYourProgressImg"
          loading = "lazy"
          className="object-contain lg:max-h-[30%] lg:-mr-28 "
        />
        <img
          src={comareWithOthersImg}
          alt="comareWithOthersImg"
          loading = "lazy"
          className="object-contain lg:max-h-[30%]"
        />
        <img
          src={PlanYourLessonsImg}
          alt="PlanYourLessonsImg"
          loading = "lazy"
          className="object-contain  lg:max-h-[30%] lg:-ml-32 "
        />
      </div>
      <div className="w-fit mt-4 mb-16 ">
      <CTAButtion active={true} linkto={"/signup"}>
        Learn More
      </CTAButtion>
      </div>
    </div>
  );
};

export default CalenderSection;

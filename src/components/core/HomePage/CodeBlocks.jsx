import React from "react";
import CTAButton from "./button";
import { FaArrowRight } from "react-icons/fa";
import { TypeAnimation } from "react-type-animation";

const CodeBlocks = ({
  position,
  heading,
  subHeading,
  ctabtn1,
  ctabtn2,
  codeBlock,
  codeColor,
  codebg,
}) => {
  return (
    <div className={`flex flex-col justify-evenly  ${position}  items-center gap-10 lg:my-20`}>
      {/* section 1 */}
      <div className=" flex flex-col gap-8 lg:w-[50%] ">
        {heading}
        <div className="text-richblack-300 font-bold">{subHeading}</div>
        <div className="flex gap-4">
          <CTAButton linkto={ctabtn1.linkto} active={ctabtn1.active}>
            <div className="flex gap-2 items-center">
              {ctabtn1.btnText}
              <FaArrowRight />
            </div>
          </CTAButton>

          <CTAButton linkto={ctabtn2.linkto} active={ctabtn2.active}>
            {ctabtn2.btnText}
          </CTAButton>
        </div>
      </div>

      {/* section 2 animation  block */}
      <div className="flex py-2 h-fit lg:min-h-[100%] relative flex-row text-[12px] w-[100%] lg:w-[400px] code-border">
        {codebg}
        {/* HW- add bg gradient */}
        <div className="w-[10%] flex flex-col text-richblack-400 font-inter font-bold text-center">
          <p>1</p>
          <p>2</p>
          <p>3</p>
          <p>4</p>
          <p>5</p>
          <p>6</p>
          <p>7</p>
          <p>8</p>
          <p>9</p>
          <p>10</p>
          <p>11</p>
        </div>
        <div className={`w-[90%] font-mono font-bold  ${codeColor} pr-2`}>
          <TypeAnimation
            sequence={[codeBlock, 2000, ""]}
            repeat={Infinity}
            style={{
              whiteSpace: "pre-line",
              display: "block",
            }}
            omitDeletionAnimation={true}
            speed={"50"}
          />
        </div>
      </div>
    </div>
  );
};


export default CodeBlocks;

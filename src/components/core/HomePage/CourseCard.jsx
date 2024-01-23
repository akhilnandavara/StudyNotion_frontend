import React from "react";
// Importing React Icons
import { HiUsers } from "react-icons/hi";
import { ImTree } from "react-icons/im";

const CourseCard = ({ cardData, currentCard, setCurrentCard }) => {
  return (
    <div>
      <div
        className={`w-[350px] h-[264px] cursor-pointer flex flex-col py-5 justify-between ${
          currentCard === cardData.heading
            ? "bg-white text-black shadow-[15px_10px_#FFD60A]"
            : "bg-richblack-800 text-white"
        }
    `}
        onClick={() => setCurrentCard(cardData.heading)}
      >
        <div className="px-5 pb-8 flex flex-col gap-5">
          <div className="font-bold text-xl">{cardData.heading}</div>
          <div className="text-richblack-300 text-sm">
            {cardData.description}
          </div>
        </div>
        <div className="border-t-2 px-5  flex pt-2 items-center justify-between border-dashed border-t-richblack-300">
          <div className={`flex items-center gap-2 ${cardData.heading===currentCard?"text-blue-300":"text-richblack-300"}`}>
            <HiUsers />
            <p>{cardData.level}</p>
          </div>
          <div className={`flex items-center  gap-2 ${cardData.heading===currentCard?"text-blue-300":"text-richblack-300"}`}>
            <ImTree />
            <p>{cardData.lessionNumber}</p>
            Lessons
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;

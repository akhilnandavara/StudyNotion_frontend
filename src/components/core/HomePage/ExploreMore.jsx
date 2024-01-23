import React, { useState } from "react";
import { HomePageExplore } from "../../../data/homepage-explore";
import CourseCard from "./CourseCard";
import HighLightText from "./HighLightText";


const tabsName = [
    "Free",
    "New to coding",
    "Most popular",
    "Skills paths",
    "Career paths",
];

const ExploreMore = () => {

    const [currentTab, setCurrentTab] = useState(tabsName[0]);
    const [courses, setCourses] = useState(HomePageExplore[0].courses);
    const [currentCard, setCurrentCard] = useState(HomePageExplore[0].courses[0].heading)

    const setMyCards = (value) => {
        setCurrentTab(value)
        const result = HomePageExplore.filter((ele) => ele.tag === value);
        setCourses(result[0].courses);
        setCurrentCard(result[0].courses[0].heading);
    }


  return (

    <div className="flex flex-col gap-4 lg:gap-10 items-center  translate-y-[100px]">

      <div className='text-4xl font-semibold'>
         Unlock the 
        <HighLightText text={"Power of Code"} />

        <p className="lg:text-center text-richblack-300 text-lg font-semibold mt-1"> Learn to build anything you can imagine </p>
      </div>

      
      {/* Tabs Section */}
      <div className="hidden lg:flex gap-5 -mt-5 w-max bg-richblack-800 text-richblack-200 p-1 rounded-full font-medium drop-shadow-[0_1.5px_rgba(255,255,255,0.25)]"> 
    
          { tabsName.map( (element, index) => {
                return (

                    <div className = {`text-[16px] flex flex-row items-center gap-2 rounded-full transition-all duration-200 cursor-pointer  hover:bg-richblack-900 hover:text-richblack-5 px-7 py-[7px]
                                    ${currentTab === element ? "bg-richblack-900 text-richblack-5 font-medium" : "text-richblack-200" } `} key = {index} onClick = {() => setMyCards(element)} >
                        {element}
                    </div>
                )})  
          }
      </div>

      {/* <div className="hidden lg:block lg:h-[50px]"></div> */}

        {/* Cards Group */}
      <div className="flex flex-col mx-auto  w-full lg:flex-row gap-10 ">
              { courses.map((ele, index) => {
                          return (
                              <CourseCard key={index} cardData = {ele} currentCard = {currentCard} setCurrentCard = {setCurrentCard} />                   
                          )})
              }
      </div>

    </div>
  
 )}

export default ExploreMore

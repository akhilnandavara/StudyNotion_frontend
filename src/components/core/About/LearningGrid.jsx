import React from "react";
import HighLightText from '../HomePage/HighLightText'
import CTAButton from '../HomePage/button'


const  LearningGridArray = [
  {
    order: -1,
    heading: "World-Class Learning for",
    highlightText: "Anyone, Anywhere",
    description:"Studynotion partners with more than 275+ leading universities and companies to bring flexible, affordable, job-relevant online learning to individuals and organizations worldwide.",
    BtnText: "Learn More",
    BtnLink: "/",
  },
  {
    order: 1,
    heading: "Curriculum Based on Industry Needs",
    description: "Save time and money! The Belajar curriculum is made to be easier to understand and in line with industry needs.",
  },
  {
    order: 2,
    heading: "Our Learning Methods",
    description: "The learning process uses the namely online and offline.",
  },
  {
    order: 3,
    heading: "Certification ",
    description: "You will get a certificate that can be used as a certification during job hunting.",
  },
  {
    order: 4,
    heading: 'Rating "Auto-grading"',
    description: "You will immediately get feedback during the learning process without having to wait for an answer or response from the mentor.",
  },
  {
    order: 5,
    heading: "Ready to Work",
    description: "Connected with over 150+ hiring partners, you will have the opportunity to find a job after graduating from our program.",
  },
];



const LearningGrid = () => {
  return (
    <div className=" grid  grid-cols-1   lg:grid-cols-4 py-20 lg:px-20  ">
      {
        LearningGridArray.map((card,index)=>(
          <div
          key={index}
          className={`${index===0&& "lg:col-span-2 bg-transparent w-full p-2"}
          ${card.order%2===0?"bg-richblack-800":"bg-richblack-700"}
          ${card.order===3&&"lg:col-start-2"}
        `}
          >
            {
            card.order<0?(
              <div className="flex flex-col  gap-4 items-start">
                <h2 className=" text-3xl text-white font-semibold ">{card.heading}
                {" "}
               <HighLightText text={ card.highlightText}/>
               </h2>
                <p className="text-richblack-300 text-sm font-[500] ">{card.description}</p>
                <CTAButton active={true} linkto={card.BtnLink}>{card.BtnText}</CTAButton>
              </div>    

            ):(
              <div className=" flex flex-col gap-8 p-8">
                <h1 className="font-bold text-white text-lg">{card.heading}</h1>
                <p className="text-richblack-300">{card.description}</p>
              </div>

            )
            }

          </div>
        ))
      }

      
    </div>
  )
}

export default LearningGrid

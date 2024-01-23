import React, { useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function InstructorChart({instructorData}) {
  const [currChart, setCurrChart] = useState("student");
  const turnCateWords=5

  const getRandomColors = (numColors) => {
    const colors = [];
    for (let i = 0; i < numColors; i++) {
      const color = `rgb(${Math.floor(Math.random() * 256)},
                            ${Math.floor(Math.random() * 256)},
                            ${Math.floor(Math.random() * 256)}
                            )`;
      colors.push(color);
    }
    return colors;
  };

  // Creating Data for chart displaying student info
  const chartDataForStudents = {
    labels:instructorData.map((course)=>(
      course.courseName.split(" ").length>turnCateWords
      ?(course.courseName.split(" ").slice(0,turnCateWords).join(" "))
      :(course?.courseName))),//returns course name in array form
    datasets:[
        {
            data:instructorData.map((course)=>course.totalStudentsEnrolled),
            backgroundColor:getRandomColors(instructorData.length)
        }
    ]
  };

  // Creating Data for  chart displaying income info
  const chartDataForIncome = {
    labels:instructorData.map((course)=>(
      course.courseName.split(" ").length>turnCateWords
      ?(course.courseName.split(" ").slice(0,turnCateWords).join(" "))
      :(course?.courseName))),//returns course name in array form
    datasets:[
        {
            data:instructorData.map((course)=>course.totalAmountGenerated),
            backgroundColor:getRandomColors(instructorData.length)
        }
    ]
  };
  const options={}

  return( 
  <div>
    <div className="flex flex-1 flex-col gap-y-4 rounded-md bg-richblack-800 p-6">
        <p className="text-lg font-bold text-richblack-5">Visualize</p>
        <div className="space-x-4 font-semibold">
            <button onClick={()=>setCurrChart("students")} className={`rounded-sm p-1 px-3 transition-all duration-200 ${currChart === "students" ? "bg-richblack-700 text-yellow-50" : "text-yellow-400" }`} >
              Students</button>
            <button onClick={()=>setCurrChart("income")} className={`rounded-sm p-1 px-3 transition-all duration-200 ${currChart === "income" ? "bg-richblack-700 text-yellow-50" : "text-yellow-400" }`} >
              Income</button>
        </div>
        <div className="relative mx-auto aspect-square h-full w-full">
            <Pie 
            data={currChart==="students"
            ? chartDataForStudents:chartDataForIncome }
            options={options}/>
        </div>
    </div>

  </div>
)}

import React from "react";
import Card from "./Bnr4_card1";
import  Card2  from "./Banner4_card2";
function Banner4() {
  const bnr4_data = [
    {
      id: 1,
      h1: "Efficient Data Management",
      p: "Store and manage all student-related data, including attendance records, grades, schedules, and more, in one centralized location in a safe manner.",
    },
    {
      id: 2,
      h1: "Enhanced Data Security",
      p: "Ensure the safety of student data through features such as restricted access to sensitive information and role-based login access.",
    },
    {
      id: 3,
      h1: "Accessible Grade Reporting",
      p: "Teachers can easily enter grades and update student progress, while parents and students can view the latest grade reports in real-time",
    },
    {
      id: 4,
      h1: "Better Data Analysis",
      p: "Schools can analyze and identify trends, measure the effectiveness of programs, save time, reduce errors, and improve student outcomes.",
    },
    {
      id: 5,
      h1: "Student's Personal Safety",
      p: "Staff can easily access & share student data, ensure responses to student needs, and enhance the overall efficiency of the institute.",
    },
  ];
  return (
    <div className=" ">
      <h1 className="text-center font-bold md:text-3xl text-[6vw] mt-10 md:mt-20 ">
      Benefits Of <br /> The Student Information System
      </h1>
      <div className="h-full ">
         {
           window.innerWidth>650? <div className="flex flex-wrap justify-center gap-15 px-10 mt-10 ">{bnr4_data.map((item) => ( <Card item={item} key={item.id}/>))}</div>:<div className="mt-5 mx-5"><Card2/></div>
        
        } 
      </div>
    </div>
  );
}

export default Banner4;

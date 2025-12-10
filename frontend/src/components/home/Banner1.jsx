import React from "react";
import { motion } from "motion/react"
import { MdReportProblem } from "react-icons/md";
import { MdLiveHelp } from "react-icons/md";

function Banner1() {
  return (
    <>
      <div className="flex md:h-screen bg-gray-100 flex-col md:flex-row">
        <div className="md:w-1/2 md:mt-60  md:ml-20 ml-5 mr-4 md:order-1 order-2">
          
          <motion.h1
          initial={{opacity:0,translateX:"-100%"}}
          animate={{opacity:1,translateX:0}}
          transition={{duration:2}}
          className="md:text-3xl text-2xl font-bold ">
            Welcome To <span className="text-blue-700 ">Student Information System</span>
          </motion.h1>
          
          <motion.p 
            initial={{opacity:0,translateX:"-100%"}}
          animate={{opacity:1,translateX:0}}
          transition={{duration:1}}
          
          className=" text-sm md:text-base  mt-3">
            From tracking student progress and accessing important information
            to connecting peers and instructors, our platform is designed to
            help you achieve your goals and succeed in your academic journey.
          </motion.p>
          <button 
           
          className="btn btn-outline btn-primary mt-10 md:w-70 md:h-15 text-lg transition-all duration-600 hover:shadow-2xl hover:h-17 hover:w-72">Start<span className="text-red-500"> :)</span></button>
        </div>
        <div className="md:w-1/2 order-1 md:order-2 ">
          <motion.img
          initial={{opacity:0,translateX:"100%"}}
          animate={{opacity:1,translateX:0}}
          transition={{duration:1}}
            className=" h-60  mt-10 mb-10 ml-13 md:mx-20 md:h-130 md:w-130  "
            src="https://cdn.pixabay.com/photo/2024/03/28/05/58/work-8660318_1280.png"
            alt=""
          />
        </div>
      </div>

<div className="z-99 left-360 top-140 fixed">
  <nav className="relative mb-10 group w-full h-40 flex items-center justify-center">

    <a
      href="#"
      className="relative w-16 h-16 bg-[#f63b3b] text-white rounded-full flex items-center justify-center shadow-xl transition-all duration-300 transform group-hover:scale-110 z-50 hover:bg-[#2563eb]"
    >
      <svg
        className="w-8 h-8 transition-transform duration-500 ease-in-out group-hover:rotate-45"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 4v16m8-8H4"
        />
      </svg>
    </a>

    <div
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex justify-center items-center z-40 transition-all duration-500"
    >
      {/* HELP BUTTON */}
      <a
        href="#"
        className="absolute transform -translate-x-1/2 opacity-0 group-hover:opacity-100 group-hover:-translate-x-[150px] transition-all duration-500 ease-[cubic-bezier(0.68,-0.55,0.27,1.55)] delay-[50ms]"
      >
        <div
          className="w-12 h-12 text-2xl bg-white rounded-full flex flex-col items-center justify-center shadow-lg transition-all duration-300 hover:scale-110 hover:bg-lime-400 hover:border-2"
        >
          <MdLiveHelp />
        </div>
        <span
          className="text-xs font-bold text-gray-700 text-center mt-2 block opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-300"
        >
          Need Help
        </span>
      </a>

      {/* REPORT BUTTON */}
      <a
        href="#"
        className="absolute transform -translate-x-1/2 opacity-0 group-hover:opacity-100 group-hover:-translate-x-[75px] transition-all duration-500 ease-[cubic-bezier(0.68,-0.55,0.27,1.55)] delay-[100ms]"
      >
        <div
          className="w-12 h-12 text-2xl bg-white rounded-full flex flex-col items-center justify-center shadow-lg transition-all duration-300 hover:scale-110 hover:bg-amber-300 hover:border-2"
        >
          <MdReportProblem />
        </div>
        <span
          className="text-xs font-bold text-gray-700 text-center mt-2 block opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-300"
        >
          Report Problem
        </span>
      </a>
    </div>
  </nav>
</div>


      
    </>
  );
}

export default Banner1;

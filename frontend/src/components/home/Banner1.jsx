import React from "react";
import { motion } from "motion/react"

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
    </>
  );
}

export default Banner1;

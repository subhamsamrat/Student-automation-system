import React from "react";
import { motion } from "motion/react"


function Banner2() {
  return (
    <>
      <div className="flex md:flex-row flex-col">
        <div className="md:w-1/2 order-2 md:order-1">
          <img
          className=" w- md:ml-30 md:h-90 md:w-90 hover:scale-105 transition-all duration-500 "
            src="https://cdn.pixabay.com/photo/2017/11/30/09/03/success-2987962_1280.jpg"
            alt=""
          />
        </div>
        <div className="md:w-1/2 md:mr-20 order-1 md:order-2 ">
        <h1 
        className=" text-center font-bold text-xl md:text-2xl md:mt-30 mt-5 ">What is a Student Information System?</h1>
        <p 
        className="m-5 text-sm md:text-base  ">A Student Information System (SIS) is your one-stop solution for all things academic. It's a powerful tool that allows you to manage a student's academic journey, from enrollment and course registration to grades and financial aid. With real-time access to important information, personalized insights, and collaborative tools, an Student Information System simplifies your academic life and helps you succeed in your studies.</p>
        </div>
      </div>
    </>
  );
}

export default Banner2;

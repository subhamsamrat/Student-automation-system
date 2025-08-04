import React, { useState } from "react";
import { motion } from "motion/react"

function Banner3_comp1({ item ,onClick}) {
      
  return (
  <div>
      <div 
      className=" p-2 mt-5 flex flex-col items-center justify-center md:h-53 md:w-50 h-35 w-20 hover:scale-110  transition-all duration-500 hover:shadow-lime-400 shadow-2xl hoer:bg-blue-600 border-y-3 rounded-md cursor-pointer  border-y-amber-400"  onClick={onClick}>
       {/* {
        item.id===4?<div className="w-1 h-5  z-0">
          <div className="badge badge-info">
            <svg
              className="size-[1em]"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                fill="currentColor"
                strokeLinejoin="miter"
                strokeLinecap="butt"
              >
                <circle
                  cx="12"
                  cy="12"
                  r="10"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="square"
                  stroke-miterlimit="10"
                  strokeWidth="2"
                ></circle>
                <path
                  d="m12,17v-5.5c0-.276-.224-.5-.5-.5h-1.5"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="square"
                  stroke-miterlimit="10"
                  strokeWidth="2"
                ></path>
                <circle
                  cx="12"
                  cy="7.25"
                  r="1.25"
                  fill="currentColor"
                  strokeWidth="2"
                ></circle>
              </g>
            </svg>
            comming....
          </div>
        </div>:""
       }  */}
       <div className="cover">
        <img className="object-contain md:blur-sm hover:blur-none transition-all duration-500 z-10" src={item.img} alt="" />
      </div>
      <p className="md:text-[13px] text-[8px] text-center mx-3 ">{item.title}</p>
      
    </div>
   
  </div>
    
    
  );
}

export  { Banner3_comp1}

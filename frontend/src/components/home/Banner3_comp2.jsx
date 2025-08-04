import React from "react";
import { motion } from "motion/react"

function Banner3_comp2({item,onClick}) {
  return (
    <div>
      <div
      className="indicator p-2 mt-5 flex flex-col items-center justify-center md:h-53 md:w-50 h-35 w-20 hover:scale-110  transition-all duration-500 hover:shadow-lime-500 shadow-2xl rounded-md cursor-pointer border-y-3 border-y-amber-400 "  onClick={onClick}>
        <span className="indicator-item badge badge-primary mr-4 text-[5px] h-[1.5vh] md:text-[12px] md:py-2.5">upcomming...</span>
        <div className="">
            <div className=" ">
       
       <div className="cover">
        <img className="object-contain md:blur-sm hover:blur-none transition-all duration-500 z-10" src={item.img} alt="" />
      </div>
      <p className="md:text-[13px] text-[8px] text-center mx-3 ">{item.title}</p>
    </div>
        </div>
      </div>
    </div>
  );
}

export default Banner3_comp2;

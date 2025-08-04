import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Card from "./Bnr4_card1";

import React from "react";
import Slider from "react-slick";

function Responsive() {

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

  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll:2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };
  return (
    <div className="slider-container">
      <Slider {...settings}>
        {
          bnr4_data.map((item)=>(
            <Card item={item} key={item.id}/>
          ))
        }
      </Slider>
    </div>
  );
}

export default Responsive;

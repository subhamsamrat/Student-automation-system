import React from "react";
import { motion } from "motion/react"

function Banner5() {
  const bnr5_data = [
    {
      id: "1",
      title: "Minimise Paper Work",
      des: "Reduce the need for manual data entry by automating and streamlining administrative processes, thus preventing paperwork and increasing overall efficiency.",
    },
    {
      id: "2",
      title: "Student Record Maintenance",
      des: "Enable institutions to capture, store, manage, and retrieve comprehensive student data in a centralized database with seamless student record maintenance.",
    },
    {
      id: "3",
      title: "Online registration",
      des: "With online registration, students can easily register for courses and activities online, reducing the need for manual paperwork and making the process more efficient.",
    },
    {
      id: "4",
      title: "Online fees Payment Provision",
      des: "A convenient and secure online fee payment system, enabling students and their families to easily make payments from anywhere, at any time.",
    },
    {
      id: "5",
      title: "Seamless Communication",
      des: "A convenient and secure online fee payment system, enabling students and their families to easily make payments from anywhere, at any time.",
    },
    {
      id: "6",
      title: "Analytic Tools And Dashboard",
      des: "With the help of deep analytics and interactive dashboards, empower educators to track and analyze student performance, attendance, and other metrics.",
    },
    {
      id: "7",
      title: "Responsive Design",
      des: "With a user-friendly interface, get easy access to academic records, course schedules, grades, attendance, and more in desktop and also in mobile.",
    },
  ];
  return (
    <>
      <div className="">
        <h1 className="text-center text-3xl font-bold mt-15">
          Key features of SIS
        </h1>

        <div className="flex h-140 mt-10 flex-col md:flex-row">
          <div className="md:w-1/2 md:gap-4 gap-2 w-85 mx-3 flex flex-col md:mx-10">
            {bnr5_data.map((item) => (
              <div
                tabIndex={0} key={item.id}
                className="bg-primar text-primary-conten focus:bg-secondary focus:text-secondary-content collapse shadow-2xl border-1 border-amber-400 bg-white text-slate-900 hover:bg-blue-500"
              >
                <div className="collapse-title font-semibold cursor-pointer">
                {item.title}
                </div>
                <div className="collapse-content text-sm cursor-pointer">
                 {item.des}
                </div>
              </div>
            ))}
          </div>

          <div className="md:w-1/2 md:flex items-center justify-center m-5  ">
            <img
              className=" rounded-lg h-full w-150 mb-10 object-cover shadow-2xl"
              src="https://images.pexels.com/photos/5428723/pexels-photo-5428723.jpeg"
              alt=""
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Banner5;

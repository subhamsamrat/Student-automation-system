import React from 'react'
import {motion} from 'motion/react'

function Banner6() {
  const  bnr6_data=[
        {
            id:'1',
            title:"What is the Purpose of Student Information System?",
            des:"The purpose of a student information system is to simplify school management, boost efficiency, and provide students with the best possible education experience."
        },
         {
            id:'2',
            title:"Who dose the Student information System Help?",
            des:"The SIS, or student information system, helps everyone involved in the education process—from students and teachers to administrators and parents—by providing easy access to important information and streamlining administrative tasks."
        },
        {
            id:'3',
            title:"Is there a need to use Student Information System?",
            des:"Yes, there is a need for using the Student Information System as it helps educational institutions efficiently manage student information, automate processes, and improve communication with students and their families. It also provides real-time access to student data, which enables informed decision-making and enhances student performance."
        },
        {
            id:'4',
            title:"How does Student management System Helps Colleges?",
            des:"Student management software helps increase operational efficiency, improve communication, and provide real-time access to important information for better decision-making. It allows for easier management of student records, admissions, attendance, grading, scheduling, and more, ultimately enhancing the overall learning experience for students."
        },
    ]
  return (
   <>
   <div>
    <h1 className='text-3xl font-bold text-center md:mt-10 mt-120'>FAQ's on Student Information System</h1>
    <div className='flex flex-col justify-center items-center mt-10 mx-4  gap-3 '>
       {
        bnr6_data.map((item)=>(
             <div key={item.id}
             tabIndex={0} className="collapse collapse-arrow bg-gray-100 hover:bg-gray-200 border-1 border-b-blue-600 border-t-emerald-500 border-x-rose-400 md:w-200   ">
  <div className="collapse-title font-semibold">{item.title}</div>
  <div className="collapse-content text-sm">
    {item.des}
  </div>
</div>
        ))
       }
    </div>
   </div>
   </>
  )
}

export default Banner6

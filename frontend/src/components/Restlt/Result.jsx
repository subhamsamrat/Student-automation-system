import React, { useEffect, useRef, useState } from "react";
import Navbar from "../home/Navbar";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";
import "../../index.css";
import html2canvas from "html2canvas";
import axios from "axios";
import { handleAxiosError } from "@/utils/handleAxiosError";
//import Result_graph from './Result_graph'

function Result() {
 const [exam,setExam]=useState([]);

  const myPercent = 50;
  const data = [
    {
      name: "John Doe",
      rollNo: "12345",
      average: 29,
      ststus: "pass",
    },
    {
      name: "John Doe",
      rollNo: "12345",
      average: 85,
      ststus: "pass",
    },
    {
      name: "John Doe",
      rollNo: "12345",
      average: 85,
      ststus: "pass",
    },
    {
      name: "John Doe",
      rollNo: "12345",
      average: 30,
      ststus: "pass",
    },
    {
      name: "John Doe",
      rollNo: "12345",
      average: 30,
      ststus: "pass",
    },
    {
      name: "John Doe",
      rollNo: "12345",
      average: 30,
      ststus: "pass",
    },
    {
      name: "John Doe",
      rollNo: "12345",
      average: 30,
      ststus: "pass",
    },
    {
      name: "John Doe",
      rollNo: "12345",
      average: 30,
      ststus: "pass",
    },
    {
      name: "John Doe",
      rollNo: "12345",
      average: 30,
      ststus: "pass",
    },
    {
      name: "John Doe",
      rollNo: "12345",
      average: 30,
      ststus: "pass",
    },
    {
      name: "John Doe",
      rollNo: "12345",
      average: 30,
      ststus: "pass",
    },
    {
      name: "John Doe",
      rollNo: "12345",
      average: 30,
      ststus: "pass",
    },
    {
      name: "John Doe",
      rollNo: "12345",
      average: 30,
      ststus: "pass",
    },
    {
      name: "John Doe",
      rollNo: "12345",
      average: 30,
      ststus: "pass",
    },
    {
      name: "John Doe",
      rollNo: "12345",
      average: 30,
      ststus: "pass",
    },
    {
      name: "John Doe",
      rollNo: "12345",
      average: 30,
      ststus: "pass",
    },
    {
      name: "John Doe",
      rollNo: "12345",
      average: 30,
      ststus: "pass",
    },
    {
      name: "John Doe",
      rollNo: "12345",
      average: 30,
      ststus: "pass",
    },
    {
      name: "John Doe",
      rollNo: "12345",
      average: 30,
      ststus: "pass",
    },
    {
      name: "John Doe",
      rollNo: "12345",
      average: 30,
      ststus: "pass",
    },
    {
      name: "John Doe",
      rollNo: "12345",
      average: 30,
      ststus: "pass",
    },
  ];

  const piData = [
    { name: "Group A", value: 15 },
    { name: "Group B", value: 85 },
    // { name: "Group C", value: 20 },
  ];
  const COLORS = ["#ff1a1a", " #33cc33", "#0066ff", "#FF8042"];
  const RADIAN = Math.PI / 180;

  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor="middle"
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

     const fetchData=async ()=>{
      try {
        const response= await axios.get('http://localhost:4000/api/v1/student/results',{
         withCredentials:true,
        });
        if(response.data.error){
          alert(response.data.error)
        }
        const exams=response.data.stdresult;
        setExam(exams);
        console.log('response',response.data.stdresult);
        

      } catch (error) {
       handleAxiosError(error);
      }
     }
//fetchData();
     useEffect(()=>{
       fetchData();
     },[])
     
      const cardRef = useRef();
    //download configuration 
    const handleDownload = async () => {
    const element = cardRef.current;
    console.log('Element: ',cardRef);
    const canvas = await html2canvas(element);
    const data = canvas.toDataURL("image/png");
    
    const link = document.createElement("a");
    link.href = data;
    link.download = "result.png";
    link.click();
  };


  return (
    <>
      <div>
        <Navbar />
        <div>
          <h1 className="text-3xl font-bold underline text-center">RESULTS</h1>
          {/* part 1 */}
          <div className=" h-80 flex mt-5">
            {/* pi chart */}
            <div className="h-full w-1/2 ">
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={piData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={renderCustomizedLabel}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {piData.map((entry, index) => (
                      <Cell
                        key={`cell-${entry.name}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="h- w-full text-sm">
                <span className="flex ml-83">
                  {" "}
                  Pass: <div className="bg-green-500 h-3 w-3 mt-1"></div>
                  <span className="ml-3"></span>
                  Fail: <div className="bg-red-500 h-3 w-3 mt-1"></div> <br />
                </span>
                <p className="ml-20 mt-2 text-stone-600 text-[13px]">
                  {" "}
                  This Diagram Represents Pass and Fail Students Average of Last
                  Exam in Your Department !!
                </p>
              </div>
            </div>
            {/* result card */}
            <div className="h-full w-1/2 pl-10">
              <div
              ref={cardRef}
                 className={`relative group h-70 w-130 bg-gradient-to-b from-[#2563eb] to-[#0f172a] rounded-lg px-5 ml-20 p-1`}
              >
                <button 
                 onClick={handleDownload} 
                className="absolute top-2 right-2 cursor-pointer bg-gray-800 px-3 py-2 rounded-md text-white tracking-wider shadow-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-bounce hover:animate-none">
                  <svg
                    className="w-5 h-5"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3"
                      strokeLinejoin="round"
                      strokeLinecap="round"
                    ></path>
                  </svg>
                </button>

                <h1 className="text-xl font-bold text-center text-black">
                  {" "}
                  Annual Exam 2025
                </h1>
                <div className="h-40 w-full flex mt-2">
                  <div className="h-full w-1/2  text-white text-sm space-y-4">
                    <p>Name: subham samrat jena </p>
                    <p>RollNo: 1234567890 </p>
                    <p>Exam Date: 12/10/25 </p>
                    <p>Total Mark: 600 </p>
                  </div>
                  <div className="h-full w-1/2 text-sm font-bold pl-15 space-y-4">
                    <p>Your Mark: 459 </p>
                    <p>Percentage: 80% </p>
                    <p>
                      Grade:{" "}
                      {myPercent >= 60 && myPercent < 100 ? (
                        <span className="text-green-400 text-lg">A</span>
                      ) : myPercent >= 30 && myPercent <= 59 ? (
                        <span className="text-yellow-500 text-lg">B</span>
                      ) : (
                        <span className="text-red-500 text-lg">C</span>
                      )}{" "}
                    </p>
                  </div>
                </div>
                <div className="border- h-15 mt-3 w-full flex ">
                  <div className="h-full w-2/3">
                    <div className="h-10 w-full bg-orange-400/40 border-1 rounded-[5px] border-amber-500 text-center pt-1.5 font-bold">
                      Rank: 20 out of 60 students
                    </div>
                  </div>
                  <div className="h-full w-1/3">
                    {myPercent >= 30 ? (
                      <div className=" h-9 w-35 text-green-500 text-center rounded-md p-2">
                        Status: Pass
                      </div>
                    ) : (
                      <div className=" h-10 w-35 text-red-500 text-center rounded-md p-2">
                        Status: Fail
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="h- w-full text-sm">
                <p className="ml-60 mt-2 text-stone-600 text-[13px]">
                  {" "}
                  Report card of your Last Exam !!
                </p>
              </div>
            </div>
          </div>
          {/* part 2 */}
          <h1 className="text-2xl font-bold underline text-center h-15 pt-2 bg-gradient-to-l from-violet-500 to-rose-500">
            Top 10 Highest Scores of Last Exam
          </h1>
          <div className=" h-full w-full px-30 mt-10">
            <table className="table ">
              <thead>
                <tr className="bg-slate-300 text-black  sticky top-18 ">
                  <th>Name</th>
                  <th>Roll No</th>
                  <th>Average</th>
                  <th>Grade</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody className="">
                {data.map((item, index) => (
                  <tr key={index} className="">
                    <td>{item.name}</td>
                    <td>{item.rollNo}</td>
                    <td>{item.average}%</td>
                    <td>
                      {item.average > 59 && item.average < 101
                        ? "A"
                        : item.average > 39
                        ? "B"
                        : "C"}
                    </td>
                    <td>{item.average < 30 ? "Fail" : "Pass"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <h1 className="h-15 w-full text-2xl font-bold text-center underline bg-gradient-to-l from-violet-500 to-rose-500 pt-2">
            Exam History
          </h1>
          {/* part 3 */}
          <div className="h-full w-full px-40 pb-20">
            <div className="h-full w-full mt-5 flex flex-col gap-5">
             {
               exam.map((item,idx)=>{
                const date=new Date(item.examDate)
                return(
                 <div className="flex h-18 rounded-xl items-center justify-around  bg-sky-300/30 shadow-[0_4px_10px_rgba(0,0,0,0.3)] text-lg hover:bg-sky-300/50"  key={idx}>
                <div className="">{idx+1}</div>
                <div className="">{item.examName}</div>
                <div className=""> {date.toLocaleDateString()}</div>
                <div className="text-sm text-blue-500 underline hover:cursor-pointer">
                  ViewResult
                </div>
              </div>)
               })
             }
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Result;

import axios from "axios";
import Navbar from "../home/Navbar";
import React, { PureComponent, useContext, useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { authContext } from "../../context/AuthContext.jsx";
import '../../index.css';
import { BACKEND_URI } from "@/config";


function Attendance() {
  const user = useContext(authContext);

  const [myPercent, setMypercent] = useState(0);
  const [myData, setMyData] = useState([]);
  const [allStudent, setStd] = useState([]);
  const [top3Std, setTop3Std] = useState([]);

  //fetching data from backend
  useEffect(() => {
    (async () => {
      const response = await axios.get(
        `${BACKEND_URI}/api/v1/student/attendance`,
        {
          withCredentials: true,
          headers: { "content-type": "application/json" },
          credentials: "include",
        }
      );

      const myData = response.data.myStats;
      const allStudent = response.data.allStudentsStats;
      const top3Std = response.data.top3Students;

      allStudent.map((e) => {
        if (e.rollNo === user.rollNo) {
          setMypercent(e.percentage);
        }
      });
      setMyData(myData);
      setStd(allStudent);
      setTop3Std(top3Std);
    })();
  }, []);

  return (
    <>
      <div>
        <Navbar />
      </div>
      <div className="md:h-100 h-70 w-full mx-10">
        <div className="md:px-20  w-full h-[300px] ">
          <h1
            className={`text-center md:text-3xl  text-[5.5vw] mt-5 mb-5 md:mb-0 font-bold bg-gradient-to-r from-fuchsia-500 to-red-500  `}
          >
            -:Bar Diagram of Your Attendance:-
          </h1>
          <ResponsiveContainer width="100%" height='100%'>
            <BarChart
              className="md:text-sm md:px-20 text-[3vw] h-200 w-200 "
              width={500}
              height={300}
              data={myData}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis domain={[0, 32]} />
              <Tooltip />
              <Legend />
              <Bar
                dataKey="present"
                fill="#3DE83A"
                background={{ fill: "#eee" }}
              />
              <Bar dataKey="absent" fill="#F53B3B" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      {/* +++++++++++++++++++++++++++++++ 2nd part ++++++++++++++++++++++++++++++++ */}

      <div className="h-100 w-full  flex mt-5 flex-col md:flex-row">
        <div className="md:w-1/2 flex flex-col items-center justify-center ">
          <h1 className="text-[25px] md:text-3xl font-bold underline w-full ml-13 md:ml-0 md:mt-0 mt-15 md:bg-gradient-to-r from-lime-500 text-center mb-4  ">
            Highest Attendances
          </h1>

          {top3Std.length === 0 ? (
            <div>Loading...</div>
          ) : (
            <>
              <div className="ml-20">
                <div className="h-20 md:w-120 w-105  rounded-md flex bg-gradient-to-tr from-yellow-400 shadow-[0_4px_10px_rgba(0,0,0,0.3)]">
                  <div className="w-1/5 rounded-full m-2 shadow-[0_4px_10px_rgba(0,0,0,0.3)] bg-cover overflow-hidden">
                    <img src={top3Std[0].image} alt="" />
                  </div>
                  <div className="w-1/1 font-bold text-2xl pt-6 pl-2 ">
                    {top3Std[0].studentName}
                  </div>
                  <div className="w-1/5 mt-2 mr-2 ">
                    <img
                      className="h-full w-full "
                      src="https://cdn-icons-png.flaticon.com/128/11167/11167970.png"
                      alt="1st"
                    />
                  </div>
                </div>

                <div className="h-20 md:w-120 w-105 mt-5 rounded-md flex bg-gradient-to-r from-purple-400 shadow-[0_4px_10px_rgba(0,0,0,0.3)]">
                  <div className="w-1/5 rounded-full m-2 shadow-[0_4px_10px_rgba(0,0,0,0.3)] bg-cover overflow-hidden">
                    <img src={top3Std[1].image} alt="" />
                  </div>
                  <div className="w-1/1 font-bold text-2xl pt-6 pl-2">
                    {top3Std[1].studentName}
                  </div>
                  <div className="w-1/5 mt-2 mr-2">
                    <img
                      src="https://cdn-icons-png.flaticon.com/128/11226/11226885.png"
                      alt="1st"
                    />
                  </div>
                </div>

                <div className="h-20 md:w-120 w-105 mt-5 px- rounded-md flex bg-gradient-to-tr from-green-400 shadow-[0_4px_10px_rgba(0,0,0,0.3)]">
                  <div className="w-1/5 rounded-full  m-2 shadow-[0_4px_10px_rgba(0,0,0,0.3)] bg-cover overflow-hidden">
                    <img src={top3Std[2].image} alt="" />
                  </div>
                  <div className="w-1/1 font-bold text-2xl pt-6 pl-2">
                    {top3Std[2].studentName}
                  </div>
                  <div className="w-1/5 mt-2 mr-2">
                    <img
                      src="https://cdn-icons-png.flaticon.com/128/11167/11167976.png"
                      alt="1st"
                    />
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        <div className="md:w-1/2 flex justify-center items-center flex-col  ml-15  ">
          <h1 className="md:bg-gradient-to-l md:from-blue-500 to-blue-500 md:to-white text-2xl mt-5 h-10 w-full text-center font-bold underline">
            Your card
          </h1>
      <div className="card card-side bg-base-100 shadow-[0_4px_10px_rgba(0,0,0,0.3)] md:h-70 md:w-160 mt-5">
            <figure>
              <img
                className="h-full w-70 rounded-l-lg object-cover"
                src={user.image.url}
                alt="image"
              />
            </figure>
            <div className="card-body rounded-r-lg ">
              <h2 className="card-title text-2xl">{user.studentName}</h2>
              <p>Roll No= {user.rollNo}</p>
              <p>
                Department= {user.department} {user.year}
              </p>
              <p className="text-[14px] font-bold">
                Your attendance= {myPercent}%
              </p>
              {myPercent >= 90 && myPercent < 100 ? (
                <p className="text-green-500">Excellent Attendee 🥇</p>
              ) : myPercent >= 75 && myPercent < 90 ? (
                <p className="text-blue-600">Good Attendee 🥈</p>
              ) : (
                <p className="text-red-600">⚠️ "Needs Improvement"</p>
              )}
              {myPercent >= 90 && myPercent < 100 ? (
                <div className="border-green-500 border p-2 text-[11px] text-green-600 bg-green-300/50 rounded-md">
                  🥇 Excellent! You have a great attendance record.
                </div>
              ) : myPercent >= 75 && myPercent < 90 ? (
                <div className="border-blue-500 border p-2 text-[11px] text-blue-600 bg-blue-300/50 rounded-md">
                  🥈 Good! You are maintaining required attendance.
                </div>
              ) : (
                <div className="border-red-500 border p-2 text-[11px] text-red-600 bg-red-300/50 rounded-md">
                  ⚠️ Your attendance is below 75%. You may not be eligible for
                  exams.
                </div>
              )}
            </div>
          </div>


        </div>
      </div>

      {/* +++++++++++++++++++++++++++++ 3rd part ++++++++++++++++++++++++++++++++ */}

      <div>
        <div className="md:h-20 h-10 ml-8 md:ml-0 w-full bg-gradient-to-r from-blue-600 to-rose-500 flex items-center justify-center mt-100 md:mt-0.5 ">
          <h1 className="text-center text-2xl font-bold ">
            <u>Detail view</u>
          </h1>
        </div>

        <div className=" h-full">
          <div>
            <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100 ">
              <table className="table w-full">
                {/* head */}
                <thead>
                  <tr className="text-black font-bold text-[3.5vw] md:text-xl">
                    <th></th>
                    <th>
                      <u>Name</u>
                    </th>
                    <th>
                      <u>Roll No</u>
                    </th>
                    <th>
                      <u>Attendance</u>
                    </th>
                  </tr>
                </thead>
                {
                  /* body */
                  <tbody className="">
                    {allStudent.map((student, index) => (
                      <tr
                        key={index}
                        className="md:bg-gradient-to-l from-yellow-300 hover:bg-gray-300 text-[3vw] md:text-[1vw]"
                      >
                        <th>{index + 1}</th>
                        <td>{student.studentName}</td>
                        <td>{student.rollNo}</td>
                        <td>{student.percentage}%</td>
                      </tr>
                    ))}
                  </tbody>
                }
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Attendance;

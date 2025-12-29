import React, { useEffect, useRef, useState } from "react";
import Navbar from "../home/Navbar";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";
import "../../index.css";
import html2canvas from "html2canvas";
import axios from "axios";
import Result_modal from "./Result_modal.jsx";
import { handleAxiosError } from "@/utils/handleAxiosError";
import { BACKEND_URI } from "@/config";

function Result() {
  const [exam, setExam] = useState([]);
  const [piData, setPiData] = useState([]);
  const [loginStdInfo, setLoginStdInfo] = useState({});
  const [top10Std, setTop10Std] = useState([]);
  const [selectedResult, setSelectedResult] = useState("");

  const examDate = new Date(loginStdInfo.examDate);

  const COLORS = ["#33cc33", "#ff1a1a"];
  const RADIAN = Math.PI / 180;

  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    payload,
  }) => {
    if (!percent || payload.value === 0) return null;
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

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${BACKEND_URI}/api/v1/student/results`,
        { withCredentials: true }
      );

      setExam(response.data.exams);
      setPiData(response.data.piData);
      setLoginStdInfo(response.data.loginStdInfo);
      setTop10Std(response.data.top10StdMark);
    } catch (error) {
      handleAxiosError(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  /* ---------- OPEN RESULT MODAL ---------- */
  const handleResult = (item) => {
    setSelectedResult(item);
    document.getElementById("result_modal").showModal();
  };

  const cardRef = useRef();

  /* ---------- DOWNLOAD CARD ---------- */
  const handleDownload = async () => {
    const element = cardRef.current;
    const canvas = await html2canvas(element);
    const data = canvas.toDataURL("image/png");

    const link = document.createElement("a");
    link.href = data;
    link.download = "result.png";
    link.click();
  };

  return (
    <>
      <Navbar />

      <div>
        <h1 className="text-3xl font-bold underline text-center">RESULTS</h1>

        {/* PART 1 = PIE + CARD */}
        <div className="h-80 flex mt-5">
          {/* PIE CHART */}
          <div className="h-full w-1/2">
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={piData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={renderCustomizedLabel}
                  outerRadius={80}
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

            <div className="w-full text-sm">
              <span className="flex ml-83">
                Pass:
                <div className="bg-green-500 h-3 w-3 mt-1 ml-2"></div>
                <span className="ml-3">Fail:</span>
                <div className="bg-red-500 h-3 w-3 mt-1 ml-2"></div>
              </span>

              <p className="ml-20 mt-2 text-stone-600 text-[13px]">
                This Diagram Represents Pass and Fail Students Average of Last
                Exam in Your Department !!
              </p>
            </div>
          </div>

          {/* RESULT CARD */}
          <div className="h-full w-1/2 pl-10">
            <div
              ref={cardRef}
              className="relative group h-70 w-130 bg-gradient-to-b from-blue-600 to-[#020617] rounded-lg px-5 ml-20 p-1"
            >
              <button
                onClick={handleDownload}
                className="cursor-pointer bg-gray-800 px-3 py-2 rounded-md text-white absolute left-110 top-2 tracking-wider shadow-xl animate-bounce hover:animate-none "
              >
                <svg
                  className="w-5 h-5"
                  stroke="currentColor"
                  stroke-width="2"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3"
                    stroke-linejoin="round"
                    stroke-linecap="round"
                  ></path>
                </svg>
              </button>

              <h1 className="text-xl font-bold text-center text-black">
                {loginStdInfo.examName}
              </h1>

              <div className="h-40 w-full flex mt-2">
                <div className="h-full w-1/2 text-[#ced9fd] text-sm space-y-4 font-">
                  <p>
                    Name:{" "}
                    <span className="text-black/70 font-bold">
                      {loginStdInfo.stdName}
                    </span>
                  </p>
                  <p>
                    RollNo:{" "}
                    <span className="text-black/70 font-bold">
                      {loginStdInfo.stdRollNo}
                    </span>
                  </p>
                  <p>
                    Exam Date:{" "}
                    <span className="text-black/70 font-bold">
                      {examDate.toDateString()}
                    </span>
                  </p>
                  <p>
                    Total Mark:{" "}
                    <span className="text-black/70 font-bold">
                      {loginStdInfo.fullMark}
                    </span>
                  </p>
                </div>

                <div className="h-full w-1/2 text-sm font-bold pl-15 space-y-4 text-[#e0e7ff]">
                  <p>
                    Your Mark:{" "}
                    <span className="text-black/70 font-bold">
                      {loginStdInfo.curedMark}
                    </span>
                  </p>
                  <p>
                    Percentage:{" "}
                    <span className="text-black/70 font-bold">
                      {loginStdInfo?.percentage?.toFixed(2)}
                    </span>{" "}
                  </p>

                  <p>
                    Grade:
                    {loginStdInfo.percentage >= 60 ? (
                      <span className="text-green-400 text-lg ml-2">A</span>
                    ) : loginStdInfo.percentage >= 40 ? (
                      <span className="text-yellow-500 text-lg ml-2">B</span>
                    ) : (
                      <span className="text-red-500 text-lg ml-2">C</span>
                    )}
                  </p>
                </div>
              </div>

              <div className="h-15 mt-3 w-full flex">
                <div className="h-full w-2/3">
                  <div className="h-10 w-full bg-amber-600/40 border border-amber-500 rounded text-center text-black pt-1.5 font-bold">
                    Rank: {loginStdInfo.rank} out of {loginStdInfo.totStd}
                  </div>
                </div>

                <div className="h-full w-1/3">
                  {loginStdInfo.percentage >= 30 ? (
                    <div className="h-9 w-35 text-green-500 text-center p-2">
                      Status: Pass
                    </div>
                  ) : (
                    <div className="h-9 w-35 text-red-500 text-center p-2">
                      Status: Fail
                    </div>
                  )}
                </div>
              </div>
            </div>

            <p className="ml-60 mt-2 text-stone-600 text-[13px]">
              Report card of your Last Exam !!
            </p>
          </div>
        </div>

        {/* TOP 10 */}
        <h1 className="text-2xl font-bold underline text-center h-15 pt-2 bg-gradient-to-l from-violet-500 to-rose-500">
          Top 10 Highest Scores of Last Exam
        </h1>

        <div className="w-full px-30 mt-10">
          <table className="table">
            <thead>
              <tr className="bg-slate-300 text-black">
                <th></th>
                <th>Name</th>
                <th>Roll No</th>
                <th>Average</th>
                <th>Grade</th>
              </tr>
            </thead>

            <tbody>
              {top10Std.map((item, index) => (
                <tr key={index}>
                  <td>
                    <img
                      className="h-10 w-10 rounded-xl ml-5"
                      src={item.image}
                      alt={item.studentName}
                    />
                  </td>
                  <td>{item.studentName}</td>
                  <td>{item.rollNo}</td>
                  <td>{item.mark.toFixed(2)}%</td>
                  <td>
                    {item.mark >= 60 ? (
                      <span className="text-green-500">A</span>
                    ) : item.mark >= 40 ? (
                      <span className="text-yellow-500">B</span>
                    ) : (
                      <span className="text-red-500">C</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* PART 3 = EXAM HISTORY */}
        <h1 className="h-15 w-full text-2xl font-bold text-center underline bg-gradient-to-l from-violet-500 to-rose-500 pt-2">
          Exam History
        </h1>

        <div className="w-full px-40 pb-20">
          <div className="flex flex-col gap-5 mt-5">
            {exam.map((item, idx) => {
              const date = new Date(item.ExamDate);
              return (
                <div
                  key={idx}
                  className="flex h-18 items-center justify-around bg-sky-300/30 rounded-xl shadow-lg hover:bg-sky-300/50"
                >
                  <div>{idx + 1}</div>
                  <div>{item.examName}</div>
                  <div>{date.toLocaleDateString()}</div>

                  <div
                    className="text-sm text-blue-500 underline cursor-pointer"
                    onClick={() => handleResult(item, "student")}
                  >
                    View Result
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* MODAL */}
        <Result_modal id="result_modal" data={selectedResult} />
      </div>
    </>
  );
}

export default Result;

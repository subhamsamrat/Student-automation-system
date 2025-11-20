import React, { useEffect, useState } from "react";
import Navbar from "../home/Navbar";
import { IoMdArrowRoundBack } from "react-icons/io";
import axios from "axios";
import { handleAxiosError } from "@/utils/handleAxiosError";
import { Loading1 } from "@/utils/Loading";

function ViewAttendance() {
  const [department, setDepartment] = useState("");
  const [year, setYear] = useState("");
  const [filtermonth, setFiltermonth] = useState("");
  const [result, setResult] = useState([]);
  const [loading,setLoading]=useState();
  console.log(" data", result);

  const getData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "http://localhost:4000/api/v1/admin/viewattendance",
        {
          params: { department, year, filtermonth },
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      setResult(response.data.result);
      setLoading(false);
    } catch (error) {
      console.log("ERROR !! in view Attendance", error);
      handleAxiosError(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if ((department && year) || filtermonth) {
      getData();
    }
  }, [department, year, filtermonth]);

  return (
    <>
      <div>
        <Navbar />
        <div className="bg-sky-500/20 h-screen ">
          <div
            className="text-2xl btn h-9 w-9 p-1.5 absolute top-23 left-4 cursor-pointer rounded-[50%] hover:bg-sky-500 bg-sky-400"
            onClick={() => window.history.back()}
          >
            <IoMdArrowRoundBack />
          </div>
          <h1 className="h-15 text-2xl font-bold text-center underline">
            View Attendance
          </h1>
          {/* selector */}
          <div className=" mt-3 ">
            <select
              defaultValue="Select Department"
              className="select select-secondary bg-sky-400/50 ml-10"
              onChange={(e) => setDepartment(e.target.value)}
            >
              <option disabled>Select Department</option>
              <option>+2-Science</option>
              <option>+3-Science</option>
              <option>BCA</option>
              <option>BBA</option>
              <option>BBT</option>
              <option>B-Tech</option>
              <option>MBA</option>
              <option>MCA</option>
            </select>

            <select
              defaultValue="Select Year"
              className="select select-secondary bg-sky-400/50 ml-10"
              onChange={(e) => {
                setYear(e.target.value);
              }}
            >
              <option disabled>Select Year</option>
              {department === "+2-Science" ||
              department === "MBA" ||
              department === "MCA" ? (
                <>
                  <option value="1st yr">1st year</option>
                  <option value="2nd yr">2nd year</option>
                </>
              ) : department === "BCA" ||
                department === "BBA" ||
                department === "BBT" ||
                department === "+3-Science" ? (
                <>
                  <option value="1st yr">1st year</option>
                  <option value="2nd yr">2nd year</option>
                  <option value="3rd yr">3rd year</option>
                </>
              ) : department === "B-Tech" ? (
                <>
                  <option value="1st yr">1st year</option>
                  <option value="2nd yr">2nd year</option>
                  <option value="3rd yr">3rd year</option>
                  <option value="4th yr">4th year</option>
                </>
              ) : null}
            </select>

            <select
              defaultValue="Filter By Month"
              className="text-sm ml-120 border-1 border-rose-500/50 text-zinc-700 p-2 rounded-md w-50 bg-sky-400/50"
              onChange={(e) => {
                setFiltermonth(e.target.value);
              }}
            >
              <option disabled> Filter By Month </option>
              <option value="1">Jan</option>
              <option value="2">Feb</option>
              <option value="3">Mar</option>
              <option value="4">Apr</option>
              <option value="5">May</option>
              <option value="6">Jun</option>
              <option value="7">Jul</option>
              <option value="8">Aug</option>
              <option value="9">Sep</option>
              <option value="10">Oct</option>
              <option value="11">Nov</option>
              <option value="12">Dec</option>
            </select>
          </div>
          <div className="h-full">
            <div className="h-10">

            </div>
            {
              loading?<Loading1/>:(
              result.length>0?(
               result.map((e,idx)=>{
                return(
                   <div className="mx-40" key={idx}>
              <div className="flex  h-12 mt-5 rounded-md bg-sky-300 py-2.5 justify-around shadow-[0_4px_10px_rgba(0,0,0,0.3)] " >
                <p>{idx+1}</p>
                <p>{e.studentName}</p>
                <p>{e.rollNo}</p>
                <div className="flex gap-5 py-1">
                  <p className="text-sm text-green-600">
                    present:- <span>{e.present}</span>{" "}
                  </p>
                  <p className="text-sm text-red-400">
                    Absent:- <span>{e.absent}</span>{" "}
                  </p>
                </div>
              </div>
            </div>
                )
               })
              ):(
                <div className="text-2xl text-center py-50 font-bold">
                  <p>No data found</p>
                </div>
              ))
            }
          </div>
        </div>
      </div>
    </>
  );
}

export default ViewAttendance;

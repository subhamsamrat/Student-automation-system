import React, { useEffect, useState } from "react";
import Navbar from "../home/Navbar";
import { IoMdArrowRoundBack } from "react-icons/io";
import axios from "axios";
import { handleAxiosError } from "@/utils/handleAxiosError";
import { Loading1 } from "@/utils/Loading";
import { BACKEND_URI } from "@/config";

function ViewAttendance() {
  const [department, setDepartment] = useState("");
  const [year, setYear] = useState("");
  const [filtermonth, setFiltermonth] = useState("");
  const [result, setResult] = useState([]);
  const [loading, setLoading] = useState(false);

  const getData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${BACKEND_URI}/api/v1/admin/viewattendance`,
        {
          params: { department, year, filtermonth },
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      setResult(response.data.result);
      setLoading(false);
    } catch (error) {
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
      <Navbar />

      <div className="bg-sky-500/20 min-h-screen relative">

        {/* Back Button */}
        <div
          className="text-2xl btn h-9 w-9 p-1.5 absolute top-3 left-4 cursor-pointer rounded-full hover:bg-sky-500 bg-sky-400"
          onClick={() => window.history.back()}
        >
          <IoMdArrowRoundBack />
        </div>

        <h1 className="pt-12 text-2xl font-bold text-center underline">
          View Attendance
        </h1>

        {/* ---------- FILTERS (Responsive) ---------- */}
        <div className="mt-5 flex flex-wrap gap-4 px-4 md:px-10 lg:px-20">

          <select
            defaultValue="Select Department"
            className="select select-secondary bg-sky-400/50 w-full sm:w-48"
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
            className="select select-secondary bg-sky-400/50 w-full sm:w-48"
            onChange={(e) => setYear(e.target.value)}
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
            className="bg-sky-400/50 border border-rose-500/50 text-zinc-700 p-2 rounded-md w-full sm:w-48"
            onChange={(e) => setFiltermonth(e.target.value)}
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

        {/* ---------- ATTENDANCE LIST ---------- */}
        <div className="mt-8 pb-10">

          {loading ? (
            <Loading1 />
          ) : result.length > 0 ? (
            result.map((e, idx) => (
              <div key={idx} className="px-4 md:px-20 lg:px-40">
                <div className="flex justify-around items-center h-12 mt-4 bg-sky-300 rounded-md shadow-[0_4px_10px_rgba(0,0,0,0.3)] px-2 text-sm sm:text-base">
                  <p>{idx + 1}</p>
                  <p>{e.studentName}</p>
                  <p>{e.rollNo}</p>

                  <div className="flex gap-4">
                    <p className="text-green-700">
                      Present: <span>{e.present}</span>
                    </p>
                    <p className="text-red-500">
                      Absent: <span>{e.absent}</span>
                    </p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-2xl text-center mt-40 font-bold">
              No data found
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default ViewAttendance;

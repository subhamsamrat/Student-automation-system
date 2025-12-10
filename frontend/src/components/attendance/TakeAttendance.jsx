import React, { useEffect, useState } from "react";
import Navbar from "../home/Navbar";
import axios from "axios";
import { handleAxiosError } from "@/utils/handleAxiosError";
import toast from "react-hot-toast";

const TakeAttendance = () => {
  const [department, setDepartment] = useState("");
  const [year, setyear] = useState("");
  const [date, setDate] = useState("");
  const [fetchstd, setfetchstd] = useState([]);
  const [loading, setLoading] = useState(false);
  const [attendance, setAttendance] = useState([]);
  const [totalPresent, setTotalPresent] = useState(0);
  const [totalAbsent, setTotalAbsent] = useState(0);

  const data = async () => {
    try {
      const response = await axios.get(
        "https://student-automation-system.onrender.com/api/v1/admin/viewstudents",
        {
          params: { department, year },
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      setfetchstd(response.data.students);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      handleAxiosError(error);
    }
  };

  useEffect(() => {
    if (!department || !year) {
      setLoading(false);
      return;
    }
    setLoading(true);
    data();
  }, [department, year]);

  const TakeAttendancePayload = {
    department,
    year,
    date,
    attendance,
  };

  // Total present & absent
  useEffect(() => {
    let present = 0;
    let absent = 0;
    attendance.forEach((item) =>
      item.status ? present++ : absent++
    );
    setTotalPresent(present);
    setTotalAbsent(absent);
  }, [attendance]);

  const handleAttendance = (studentId, isPresent) => {
    const updated = attendance.filter((a) => a.stdId !== studentId);

    updated.push({
      stdId: studentId,
      status: isPresent,
    });

    setAttendance(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!department || !year || !date) {
        toast.error("Please fill all fields");
        return;
      }

      if (fetchstd.length !== attendance.length) {
        toast.error("Please mark attendance for all students");
        return;
      }

      toast.promise(
        axios.post(
          "https://student-automation-system.onrender.com/api/v1/admin/takeattendance",
          TakeAttendancePayload,
          {
            withCredentials: true,
            headers: { "Content-Type": "application/json" },
          }
        ),
        {
          loading: "Publishing...",
          success: (res) => {
            setDepartment("");
            setyear("");
            setDate("");
            setAttendance([]);
            setfetchstd([]);
            return res.data.message;
          },
          error: (err) =>
            err.response?.data?.error || "Something went wrong!",
        }
      );
    } catch (error) {
      handleAxiosError(error);
    }
  };

  return (
    <>
      <Navbar />

      <div className="h-10 mt-2">
        <h1 className="bg-gradient-to-r from-yellow-500 to-rose-600 bg-clip-text text-transparent text-3xl flex justify-center font-bold">
          Take Attendance
        </h1>
      </div>

      {/* ----------- TOP FILTER SECTION ----------- */}
      <div className="flex flex-wrap md:flex-nowrap items-center gap-4 p-4 md:p-6">

        {/* Department */}
        <div>
          <select
            onChange={(e) => setDepartment(e.target.value)}
            value={department}
            className="select select-primary w-40 md:w-auto"
          >
            <option value="" disabled>
              Select department
            </option>
            <option>+2-Science</option>
            <option>+3-Science</option>
            <option>BCA</option>
            <option>BBA</option>
            <option>BBT</option>
            <option>B-Tech</option>
            <option>MBA</option>
            <option>MCA</option>
          </select>
        </div>

        {/* Year */}
        <div>
          <select
            onChange={(e) => setyear(e.target.value)}
            value={year}
            className="select select-primary w-32 md:w-auto"
          >
            <option value="" disabled>
              Select Year
            </option>

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
        </div>

        {/* Date */}
        <div className="flex items-center gap-2">
          <p className="font-bold">Date:</p>
          <input
            onChange={(e) => setDate(e.target.value)}
            type="date"
            className="input w-40 md:w-60"
          />
        </div>

        {/* View Attendance Button */}
        <a
          href="/viewattendance"
          className="btn md:ml-100 bg-gradient-to-bl to-blue-500 from-pink-500 text-white"
        >
          View Attendance
        </a>
      </div>

      {/* ----------- TABLE SECTION ----------- */}
      <div className="flex justify-center p-2">
        <div className="w-full max-w-5xl overflow-auto rounded-box border border-base-content/5 bg-base-100">
          <table className="table">
            <thead>
              <tr className="bg-slate-300 text-black sticky top-0">
                <th></th>
                <th>Name</th>
                <th>Roll No</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="4" className="text-center py-4">
                    Loading...
                  </td>
                </tr>
              ) : fetchstd.length > 0 ? (
                fetchstd.map((item, idx) => {
                  const currentStatus = attendance.find(
                    (a) => a.stdId === item._id
                  )?.status;

                  return (
                    <tr key={item._id}>
                      <th>{idx + 1}</th>
                      <td>{item.studentName}</td>
                      <td>{item.rollNo}</td>

                      <td>
                        <div className="flex gap-2">
                          <button
                            onClick={() =>
                              handleAttendance(item._id, true)
                            }
                            className={`btn ${
                              currentStatus === true
                                ? "bg-green-500 text-white"
                                : "bg-transparent text-green-500"
                            }`}
                          >
                            P
                          </button>

                          <button
                            onClick={() =>
                              handleAttendance(item._id, false)
                            }
                            className={`btn ${
                              currentStatus === false
                                ? "bg-red-500 text-white"
                                : "bg-transparent text-red-500"
                            }`}
                          >
                            A
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="4" className="text-center">
                    No Data Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ----------- FOOTER SECTION ----------- */}
      <div className="w-full flex flex-wrap justify-center gap-5 mt-5 p-3">
        <h3>Total Present = {totalPresent}</h3>
        <h3>Total Absent = {totalAbsent}</h3>

        <button
          onClick={handleSubmit}
          className="btn bg-blue-500 text-white"
        >
          Submit
        </button>
      </div>
    </>
  );
};

export default TakeAttendance;

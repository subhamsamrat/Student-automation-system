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

  //get student data from backend ...........
  const data = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/api/v1/admin/viewstudents",
        { params: { department, year } }
      );

      const std = response.data.students;
      setfetchstd(std);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log("ERROR !! in takeAttendance.jsx:", error);
      handleAxiosError(error);
    }
  };

  //only ruyn when department and year change
  useEffect(() => {
    if (!department || !year) {
      setLoading(false);
      return;
    }
    setLoading(true);
    data();
  }, [department, year]);

  const TakeAttendance = {
    department,
    year,
    date,
    attendance,
  };
  //calculating total present and absent
  setTimeout(() => {
    let present = 0;
    let absent = 0;
    attendance.forEach((item) => {
      if (item.status === true) {
        present += 1;
      } else {
        absent += 1;
      }
    });
    setTotalPresent(present);
    setTotalAbsent(absent);
  }, 500);

  //handle attendance
  const handleAttendance = (studentId, isPresent) => {
    const updatedAttendance = [...attendance];
    function removeObj(array, id) {
      const index = array.findIndex((item) => item.stdId === id);
      if (index !== -1) {
        array.splice(index, 1);
      }
      console.log("array", array);

      return array;
    }
    removeObj(updatedAttendance, studentId);

    updatedAttendance.push({
      stdId: studentId,
      status: isPresent,
    });
    setAttendance(updatedAttendance);
  };

  //post attendancev reports
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (
        (!TakeAttendance && TakeAttendance.department === "") ||
        TakeAttendance.year === "" ||
        TakeAttendance.date === ""
      ) {
        toast.error("Please fill all the fields");
        return;
      }
      if (fetchstd.length !== TakeAttendance.attendance.length) {
        toast.error("Please mark atten dance for all students");
        return;
      }
    toast.promise(
  axios.post(
    "http://localhost:4000/api/v1/admin/takeattendance",
    TakeAttendance,
    {
      withCredentials: true,
      headers: { "Content-Type": "application/json" },
    }
  ),
  {
    loading: "Publishing...",
    success: (res) => {
       setDepartment('');
        setyear('');
        setDate('');
        setAttendance([]);
        setfetchstd([])
      return <b>{res.data.message || "Published successfully!"}</b>;
    },
    error: (err) => {
      if ( err.response.data.error){    
        return <b>{err.response.data.error}</b>;
      } else {
        return <b>Something went wrong!</b>;
      }
    },
  }
);   
    } catch (error) {
      console.log("Error in submitting attendance", error);
      handleAxiosError(error);
    }
  };

  return (
    <>
      <div>
        <Navbar />
        <div className="h-10 mt-2">
          <h1 className=" bg-gradient-to-r from-yellow-500 to-rose-600 bg-clip-text text-transparent text-3xl flex justify-center font-bold">
            Take Attendane{" "}
          </h1>
        </div>
        <div className="h-20  flex  items-center">
          <div className="ml-10">
            <select
              onChange={(e) => {
                setDepartment(e.target.value);
              }}
              value={department}
              //defaultValue="select department"
              className="select select-primary"
            >
              <option value="" disabled={true}>
                Select department
              </option>
              <option value="BCA">BCA</option>
              <option value="BBT">BBT</option>
              <option value="BBA">BBA</option>
              <option value="MCA">MCA</option>
            </select>
          </div>
          <div className="ml-5">
            <select
              onChange={(e) => {
                setyear(e.target.value);
              }}
              value={year}
              //defaultValue="select year"
              className="select select-primary"
            >
              <option value="" disabled={true}>
                Select year
              </option>
              <option value="1st yr">1st yr</option>
              <option value="2nd yr">2nd yr</option>
              <option value="3rd yr">3rd yr</option>
            </select>
          </div>

          <div className="ml-20 flex justify-center items-center gap-2">
            <p className="font-bold">Date:-</p>
            <input
              onChange={(e) => {
                setDate(e.target.value);
              }}
              type="date"
              className="input w-60"
            />
          </div>
          <div className=" btn ml-130 bg-gradient-to-bl to-blue-500 from-pink-500 hover:bg-gradient-to-bl hover:to-pink-500 hover:from-blue-500 transition-all ">
            <p className=" font-bold">View Attendance</p>
          </div>
        </div>

        <div className="h-full flex justify-center items-center ">
          <div className="overflow-x-auto overflow-y-auto rounded-box border border-base-content/5 bg-base-100 w-300 mt-10">
            <table className="table ">
              {/* head */}
              <thead className="">
                <tr className=" bg-slate-300 text-black sticky top-0">
                  <th></th>
                  <th>Name</th>
                  <th>Roll No</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody className="h-95">
                {/* row 1 */}
                {loading ? (
                  <tr>
                    <td colSpan="4" className="text-center">
                      Loading......
                    </td>
                  </tr>
                ) : fetchstd.length > 0 ? (
                  fetchstd.map((item, idx) => (
                    <tr key={item._id || idx} className="hover:bg-gray-200">
                      <th>{idx + 1}</th>
                      <td>{item.studentName}</td>
                      <td>{item.rollNo}</td>
                      <td>
                        <div>
                          {/* <button
                            onClick={() => {handleAttendance(item._id, true)}}
                           className={`btn text-green-500`}
                          >
                            P
                          </button> */}
                          {(() => {
                            const currentStatus = attendance.find(
                              (a) => a.stdId === item._id
                            )?.status;
                            return (
                              <>
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
                                  className={`btn ml-2 ${
                                    currentStatus === false
                                      ? "bg-red-500 text-white"
                                      : "bg-transparent text-red-500"
                                  }`}
                                >
                                  A
                                </button>
                              </>
                            );
                          })()}
                          {/* <button
                            onClick={() => handleAttendance(item._id, false)}
                            className="text-red-500 btn ml-2"
                          >
                            A
                          </button> */}
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center">
                      data not found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
        <hr />
        <div className="h-15 mx- w-screen  ">
          <div className="flex items-center justify-evenly mt-">
            <h3>Total Present={totalPresent}</h3>
            <h3 className="ml-">Total Absent={totalAbsent}</h3>
            <button
              onClick={handleSubmit}
              className="ml- bg-blue-500 btn text-white mt-2"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default TakeAttendance;

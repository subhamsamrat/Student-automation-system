import React, { useEffect, useState } from "react";
import Navbar from "../home/Navbar";
import axios from "axios";
import TextField from "@mui/material/TextField";
import { handleAxiosError } from "@/utils/handleAxiosError";
 import toast from 'react-hot-toast';
<<<<<<< HEAD
import { BACKEND_URI } from "@/config";
=======
>>>>>>> 6ad45bcb9dcd07d92a868b9b2c3c577d4a243b18


const AddResult = () => {
  const [department, setDepartment] = useState("");
  const [year, setyear] = useState("");
  const [examName, setExamName] = useState("");
  const [fullMark, setFullMark] = useState("");
  const [ExamDate, setExamDate] = useState("");
  const [fetchstd, setfetchstd] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stdResult,setStdResult]=useState([]);

  //---------------get student data from backend ---------------
  const data = async () => {
    try {
<<<<<<< HEAD
      const response = await axios.get(`${BACKEND_URI}/api/v1/admin/viewstudents`,{params: { department, year },
=======
      const response = await axios.get("https://student-automation-system.onrender.com/api/v1/admin/viewstudents",{params: { department, year },
>>>>>>> 6ad45bcb9dcd07d92a868b9b2c3c577d4a243b18
     withCredentials: true,
    });
    
      setfetchstd(response.data.students);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log("ERROR !! in takeAttendance.jsx:", error);
      handleAxiosError(error);
    }
  };

   //run only when department and year will change
  useEffect(() => {
     if (!department || !year) {
    setLoading(false); 
    return;
  }
  setLoading(true);
  setfetchstd([]);
  data();
  }, [department, year]);

  //data which go to backend 
  const submitResult = {
    department,
    year,
    examName,
    fullMark,
    ExamDate,
   stdResult
  };

  // collect marks and ID of each studnet in an array
  const handelMark = (stdId, mark) => {
  setStdResult((prev) => {
    const updated = [...prev];
    const existing = updated.find((s) => s.stdId === stdId);

    if (existing) {
      existing.mark = mark; 
    } else {
      updated.push({ stdId, mark });
    }

    return updated;
  });
};
 
  //post result reports
  const handleSubmit = async () => {
    try {

      if(submitResult.department===''){
        toast.error('Please select department');
        return;
      }
      if(submitResult.year===''){
        toast.error('Please select year');
        return;
      }
      if(submitResult.examName===''){
        toast.error('Please enter exam name');
        return;
      }
      if(submitResult.fullMark===''){
        toast.error('Please enter full mark');
        return;
      }
      if(submitResult.ExamDate===''){
        toast.error('Please select exam date');
        return;
      }
      if(submitResult.stdResult.length===0 || submitResult.stdResult.some((e)=>e.mark==='')){
        toast.error('Please enter students Results');
        return;
      }  console.log('length od std result=',submitResult.stdResult);
      
        if(submitResult.stdResult.some((e)=>e.mark>submitResult.fullMark ||e.mark<0 )){  
      toast.error('Please Enter a Valid Marks');
      return;
      }
      if(submitResult.stdResult.length!==fetchstd.length){
        toast.error('Please enter all students Results');
        return;
      }
          console.log('succesfull=',submitResult);

<<<<<<< HEAD
      toast.promise(axios.post(`${BACKEND_URI}/api/v1/admin/addresult`, submitResult,{withCredentials: true}),
=======
      toast.promise(axios.post("https://student-automation-system.onrender.com/api/v1/admin/addresult", submitResult,{withCredentials: true}),
>>>>>>> 6ad45bcb9dcd07d92a868b9b2c3c577d4a243b18
      {
    loading: "Publishing...",
    success: (res) => {
      return <b>{res.data.message || "Published successfully!"}</b>;
    },
    error: (err) => {
      if ( err.response.data.error){    
        return <b>{err.response.data.error}</b>;
      } else {
        return <b>Something went wrong!</b>;
      }
    },
  });
        setDepartment('');
        setyear('');
        setExamName('');
        setFullMark('');
        setExamDate('');
        setfetchstd([]);
        setStdResult([]);
        setTimeout(()=>{   window.location.reload();},1500)
     
    } catch (error) {
      console.log("Error in publishing results", error);
      handleAxiosError(error);
    }
  };

  

  return (
  <>
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-100 to-slate-200">
      <Navbar />

      {/* Heading */}
      <div className="mt-4 px-4">
        <h1 className="text-3xl md:text-4xl font-bold text-center bg-gradient-to-r from-yellow-500 to-rose-600 bg-clip-text text-transparent">
          Publish Results
        </h1>
      </div>

      {/* Filters Section */}
      <div className="flex  justify-center gap-4 mt-8 px-4">
        <select
          onChange={(e) => setDepartment(e.target.value)}
          value={department}
          className="select select-primary w-full sm:w-56"
        >
          <option value="" disabled>Select Department</option>
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
          onChange={(e) => setyear(e.target.value)}
          value={year}
          className="select select-primary w-full sm:w-56"
        >
          <option value="" disabled>Select Year</option>
          {department === "+2-Science" || department === "MBA" || department === "MCA" ? (
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

        <a href="/viewresult" className="w-full sm:w-48 md:ml-180">
          <button className="btn w-full h-full bg-gradient-to-r from-red-400 to-blue-500 font-bold hover:scale-105 duration-200">
            View Results
          </button>
        </a>
      </div>

      {/* Exam Details */}
      <div className="flex flex-wrap  gap-6 mt-10 md:ml-10 px-4">
        <TextField
          id="examName"
          label="Exam Name"
          variant="outlined"
          className="w-full  sm:w-64 bg-white/80 rounded-md"
          onChange={(e) => setExamName(e.target.value)}
        />

        <TextField
          id="fullMark"
          label="Full Mark"
          variant="outlined"
          className="w-full sm:w-64 bg-white/80 rounded-md"
          onChange={(e) => setFullMark(e.target.value)}
        />

        <div>
           <p className="text-[12px] text-gray-500 mt-1">Exam Date</p>
          <input
            onChange={(e) => setExamDate(e.target.value)}
            type="date"
            className="input w-full sm:w-60 bg-white/80"
          />
         
        </div>
      </div>

      {/* Student List Heading */}
      <div className="mt-12 px-4">
        <h1 className="text-lg md:text-xl font-bold text-center bg-gradient-to-r from-yellow-300 to-lime-500 text-black py-2 rounded-md shadow">
          Fill Student Marks
        </h1>
      </div>

      {/* Students List */}
      <div className="mt-6 px-4 max-w-4xl mx-auto flex flex-col gap-4">
        {loading ? (
          <div className="text-center py-20 font-bold text-xl">
            <div className="flex justify-center">
              <div className="w-14 h-14 border-4 border-t-blue-400 border-gray-300 rounded-full animate-spin" />
            </div>
          </div>
        ) : fetchstd.length === 0 ? (
          <div className="text-center text-xl font-semibold text-gray-600 py-10">
            No data found
          </div>
        ) : (
          fetchstd.map((item, idx) => (
            <div
              key={idx}
              className="flex flex-wrap md:flex-nowrap items-center justify-between bg-white shadow-md rounded-lg px-4 py-3 
              bg-gradient-to-r from-yellow-300/60 to-yellow-500/30"
            >
              <p className="w-1/12 text-center">{idx + 1}</p>
              <p className="w-4/12 md:w-3/12">{item.studentName}</p>
              <p className="w-3/12 md:w-2/12">{item.rollNo}</p>

              <TextField
                label="Enter Mark"
                variant="standard"
                className="w-3/12 md:w-2/12"
                onChange={(e) => handelMark(item._id, e.target.value)}
              />
            </div>
          ))
        )}
      </div>

      {/* Submit Button */}
      <div className="text-center mt-10 mb-16">
        <button
          onClick={handleSubmit}
          className="bg-blue-600 text-white font-bold px-8 py-3 rounded-lg shadow-lg 
          hover:bg-blue-700 active:scale-95 transition-transform"
        >
          Publish
        </button>
      </div>
    </div>
  </>
);

};

export default AddResult;

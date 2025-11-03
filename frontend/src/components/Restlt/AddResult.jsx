import React, { useEffect, useState } from "react";
import Navbar from "../home/Navbar";
import axios from "axios";
import TextField from "@mui/material/TextField";
import { handleAxiosError } from "@/utils/handleAxiosError";
 import toast from 'react-hot-toast';


const AddResult = () => {
  const [department, setDepartment] = useState("");
  const [year, setyear] = useState("");
  const [examName, setExamName] = useState("");
  const [fullMark, setFullMark] = useState("");
  const [ExamDate, setExamDate] = useState("");
  const [fetchstd, setfetchstd] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stdResult,setStdResult]=useState([]);
  const [error,setError]=useState('');

  //get student data from backend ...........
  const data = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/v1/admin/viewstudents",{params: { department, year }, });
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

      toast.promise(axios.post("http://localhost:4000/api/v1/admin/addresult", submitResult),
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
      <div className="h-full w-screen">
        <Navbar />
        <div className="h-10 mt-2">
          <h1 className=" bg-gradient-to-r from-yellow-500 to-rose-600 bg-clip-text text-transparent text-3xl flex justify-center font-bold">
              Publish Results
          </h1>
        </div>
        <div className="flex items-center h-full mt-10">
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
          <div className=" w-40 ml-240 h-10 rounded-md">
            <a href="/viewresult">
               <button className="btn h-full w-full bg-gradient-to-r from-red-400 to-blue-500 text- font-bold hover:scale-105 transition-all">
                      View Results
                    </button>
            </a>
                   
          </div>
        </div>

        <div className="flex mx-10 mt-5">
          <div className="">
            {" "}
            <TextField
              id="examName"
              label="Exam Name"
              variant="outlined"
              className="bg-gradient-to-bl to-rose-500/50 from-red- rounded-md"
              onChange={(e) => {
                setExamName(e.target.value);
              }}
            />
          </div>

          <div className="ml-20">
            <TextField
              id="fullMark"
              label="Full Mark"
              variant="outlined"
              className="bg-gradient-to-bl to-rose-500/50"
              onChange={(e) => {
                setFullMark(e.target.value);
              }}
            />
          </div>
          <div className="flex flex-col h-15   mt- ml-20 ">
            <input
              onChange={(e) => {
                setExamDate(e.target.value);
              }}
              type="date"
              className="input w-60 h-15 bg-gradient-to-bl to-rose-500/50"
            />
            <p className="text-[12px] text-zinc-500">Exam Date</p>
          </div>
        </div>
        <div className=" mt-10 h-">
          <h1 className="text-xl font-bold pl-10 p-1 h-10 bg-gradient-to-l from-yellow-300 to-lime-500 text-center">
            Fillup students Mark{" "}
          </h1>
          <div className="mt-5 flex flex-col mx-30 gap-5">
            {loading ? (
              <div className="h-100 w-full text-center py-30 font-bold text-2xl">
                <div className="flex-col gap-4 w-full flex items-center justify-center">
                  <div className="w-20 h-20 border-4 border-transparent text-blue-400 text-4xl animate-spin flex items-center justify-center border-t-blue-400 rounded-full">
                    <div className="w-16 h-16 border-4 border-transparent text-red-400 text-2xl animate-spin flex items-center justify-center border-t-red-400 rounded-full"></div>
                  </div>
                </div>
              </div>
            ) : (
              fetchstd.length==0? <div className="h-50 text-center text-2xl font-bold py-20"> No data found</div>:
              fetchstd.map((item, idx) => (
                <div
                  key={idx}
                  className="h-15 flex items-center justify-around rounded-md bg-gradient-to-r from-yellow-400 shadow-[10px_4px_10px_rgba(0,0,0,0.3)]"
                >
                  <p>{idx + 1}</p>
                  <p>{item.studentName}</p>
                  <p>{item.rollNo}</p>
                  <TextField
                    id="standard-basic"
                    label="Enter Mark"
                    variant="standard"
                    onChange={(e)=>handelMark(item._id,e.target.value)}
                  />
                </div>)
            ))
            }
          </div>
          <div className="h-18 text-center mt-5">
            <button
              onClick={handleSubmit}
              className="cursor-pointer transition-all bg-blue-500 text-white px-6 py-2 rounded-lg
                              border-blue-600
                              border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px]
                                active:border-b-[2px] active:brightness-90 active:translate-y-[2px]"
            >
              Publish
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddResult;

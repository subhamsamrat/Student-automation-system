import React, { useEffect, useState } from 'react';
import Navbar from '../home/Navbar';
import { Loading1 } from '@/utils/Loading.jsx';
import axios from 'axios';

function ViewResult() {
  const[department,setDepartment]=useState('');
  const [year,setYear]=useState('');
  const[loading,setLoading]=useState(false); 
  const res=true;
  console.log('department=',department,'  ','year=',year);
  
  const fetchData=async()=>{
    const response=await axios.get('http://localhost:4000/api/v1/admin/viewresults',department,year);
    console.log(response);
    
  }

  useEffect(()=>{
    fetchData();
  },[]);

  return (
   <>
   <Navbar/>
   <div className="bg-lime-500/20">
      <h1 className='h-15 text-center pt-3 font-bold text-2xl underline'>View Results</h1>
       <div className=''>
          <div className='px-20 '>
                <select defaultValue="Select Department" className="select select-info bg-lime-500/20" onChange={(e)=>{setDepartment(e.target.value)}}>
  <option disabled={true}>Select Department</option>
  <option>+2-Science</option>
  <option>+3-Science</option>
  <option>BCA</option>
  <option>BBA</option>
  <option>BBT</option>
  <option>B-Tech</option>
  <option>MBA</option>
  <option>MCA</option>

  
</select>

<select defaultValue="Select Year" className="select select-info ml-10 bg-lime-500/20" onChange={(e)=>{setYear(e.target.value)}}>
  <option disabled={true}>Select Year</option>
     {
     department ==='+2-Science' || department ==='MBA' || department==='MCA' ?
      ( <>
       <option>1st year</option>
       <option>2nd year</option>
       </>)
       :department=== 'BCA' || department==='BBA' || department==='BBT' || department==='+3-Science'?
      ( <>
       <option>1st year</option>
        <option>2nd year</option>
       <option>3rd year</option>
       </>)
       :department==='B-Tech'?
       (<>
        <option>1st year</option>
        <option>2nd year</option>
        <option>3rd year</option>
        <option>4th year</option>
       </>):''
     }
</select>
          </div>
          <h1 className='h-10 mt-3 text-2xl text-white font-bold underline text-center bg-gradient-to-bl to-blue-900 from-blue-500'>Exam List</h1>

          <div className='h-115 overflow-y-auto mx-20 mt-3'>
              {loading?(<Loading1/>):
              (
                  res?(
                       <div className='h-15 rounded-xl shadow-xl  bg-lime-400/60 shadow-[10px_4px_10px_rgba(0,0,0,0.3) flex items-center justify-around'>
                          <div><p>1</p></div>
                          <div><p>Annual Exam 1</p></div>
                          <div><p> 20-09-2025</p></div>
                          <div><a href="" className='text-blue-500 underline text-sm'>View Result</a></div>
                       </div>
                  ):(
                    <div >
                    <h1 className='text-2xl font-bold text-center pt-50'>No Data Found</h1>
                    </div>
                  )
              )
              }
          </div>

       </div>
       
   </div>
   </>
  )
}

export default ViewResult

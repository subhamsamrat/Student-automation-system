import { handleAxiosError } from '@/utils/handleAxiosError';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Result_modal({ data }) {
  
  const [result, setResult] = useState([]);
         
  const department = data?.department;
  const year = data?.year;
  const role=JSON.parse(localStorage.getItem('user'))
   
  if(data){
    var date=new Date(data.ExamDate)
  }
 

   const stdDetails = async () => {
      try {
        let apiResponse;
        if(role.role==='admin'){
            apiResponse = await axios.get('https://student-automation-system.onrender.com/api/v1/admin/viewstudents', {
          params: { department, year },
           withCredentials:true,
        headers:{'Content-Type':'application/json'}
        });   
      }else if(role.role==='student'){
           apiResponse = await axios.get('https://student-automation-system.onrender.com/api/v1/student/students', {
          params: { department, year },
           withCredentials:true,
        headers:{'Content-Type':'application/json'}
        });
      }
         
      const info = [];
        data.stdResult.forEach((e) => {
          apiResponse.data.students.forEach((item) => {
            if (e.stdId === item._id) {
              info.push({
                name: item.studentName,
                rollNo: item.rollNo,
                mark: e.mark,
                ID:e.stdId
              });
            }
          });
        });

        setResult(info);
      } catch (error) {
        console.log('Error !! in Result_modal.jsx', error);
        handleAxiosError(error);
      }
    };
  

  useEffect(() => {
    
    if (department && year) {
      stdDetails();
    }
  }, [data]);

   

  return (
    <dialog id="result_modal" className="modal">
      <div className="modal-box max-w-3xl h-[95vh] overflow-auto hide-scrollbar">
        <button
          onClick={() => document.getElementById('result_modal').close()}
          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
        >
          ✕
        </button>

        <h3 className="font-bold text-2xl underline text-amber-500">{data?data.examName:'loading...'}</h3>
        <div className="flex mt-5">
          <p className="font-bold">Exam Date:- <span className='text-blue-400'>{date?date.toDateString():'loading...'}</span></p>
          <p className="ml-40 font-bold">Full Mark:- <span className='text-blue-400'>{data?data.fullMark:'loading'}</span></p>
        </div>

        <div className="overflow-auto hide-scrollbar mt-5"> 
          <table className="table">
            <thead>
              <tr className="bg-gray-400 text-black sticky top-0">
                <th>Name</th>
                <th>Roll No</th>
                <th>Mark</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {result.map((item, index) => (
                <tr key={index}
                 className={`${
                    index % 2 === 0 ? "bg-amber-50" : "bg-white"
                  } ${role._id===item.ID ? "text-[#9416ee] font-extrabold" : ""} hover:bg-blue-50`}
                >
                  <td>{item.name}</td>
                  <td>{item.rollNo}</td>
                  <td>{item.mark}</td>
                  <td>
                    {item.mark < 30 ? (
                      <p className="text-red-500">Fail</p>
                    ) : (
                      <p className="text-green-500">Pass</p>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </dialog>
  );
}

export default Result_modal;

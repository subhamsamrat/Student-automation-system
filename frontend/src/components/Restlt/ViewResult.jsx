import React, { useEffect, useState } from 'react';
import Navbar from '../home/Navbar';
import { Loading1 } from '@/utils/Loading.jsx';
import axios from 'axios';
import Result_modal from './Result_modal.jsx';
import { IoMdArrowRoundBack } from "react-icons/io";
import { handleAxiosError } from '@/utils/handleAxiosError';

function ViewResult() {
  const [department, setDepartment] = useState('');
  const [year, setYear] = useState('');
  const [result, setResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedResult, setSelectedResult] = useState(null); 

  //fetch students from backend ............
  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:4000/api/v1/admin/viewresults', {
        params: { department, year },
        withCredentials:true,
        headers:{'Content-Type':'application/json'}
      });
      setResult(response.data.results || []);
    } catch (err) {
      console.error('Fetch error:', err);
      handleAxiosError(err);
    } finally {
      setLoading(false);
    }
  };

    //only run when department and year will change
  useEffect(() => {
    if (department && year) {
      fetchData();
    }
  }, [department, year]);

    //open a modal which shows results
  const handleOpenModal = (item) => {
    setSelectedResult(item);
    document.getElementById('result_modal').showModal(); 
  };

  return (
    <>
      <Navbar />
      <div className="bg-lime-500/20 min-h-screen">
       <div className="text-2xl btn h-9 w-9 p-1.5 absolute top-23 left-4 cursor-pointer rounded-[50%] hover:bg-lime-500 bg-lime-400" onClick={() => window.history.back()}>
         <IoMdArrowRoundBack />
        </div>
        <h1 className="text-center pt-3 font-bold text-2xl underline">View Results</h1>

        {/* Select fields */}
        <div className="px-20 mt-3">
          <select
            defaultValue="Select Department"
            className="select select-info bg-lime-500/20"
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
            className="select select-info ml-10 bg-lime-500/20"
            onChange={(e) => setYear(e.target.value)}
          >
            <option disabled>Select Year</option>
            {department === '+2-Science' || department === 'MBA' || department === 'MCA' ? (
              <>
                <option value="1st yr">1st year</option>
                <option value="2nd yr">2nd year</option>
              </>
            ) : department === 'BCA' ||
              department === 'BBA' ||
              department === 'BBT' ||
              department === '+3-Science' ? (
              <>
                <option value="1st yr">1st year</option>
                <option value="2nd yr">2nd year</option>
                <option value="3rd yr">3rd year</option>
              </>
            ) : department === 'B-Tech' ? (
              <>
                <option value="1st yr">1st year</option>
                <option value="2nd yr">2nd year</option>
                <option value="3rd yr">3rd year</option>
                <option value="4th yr">4th year</option>
              </>
            ) : null}
          </select>
        </div>

        {/* Exam List */}
        <h1  className="mt-5 h-10 text-2xl text-white font-bold underline text-center bg-gradient-to-bl to-blue-900 from-blue-500">
          Exam List
        </h1>

        <div className=" mx-40 mt-3">
          {loading ? (
            <Loading1 />
          ) : result.length > 0 ?(
            result.map((e, idx) => {
              const date = new Date(e.ExamDate);
              return (
                <div
                  key={idx}
                  className="flex items-center justify-around mt-3 bg-lime-400/60 rounded-xl shadow-xl p-3"
                >
                  <p>{idx + 1}</p>
                  <p>{e.examName}</p>
                  <p>{date.toLocaleDateString()}</p>
                  <a
                    className="text-blue-500 underline text-sm cursor-pointer"
                    onClick={() => handleOpenModal(e)}
                  >
                    View Result
                  </a>
                </div>
              );
            })
          ) : (
            <h1 className="text-2xl h-20 mt-40 font-bold text-center">No Data Found</h1>
          )}
        </div>
        <Result_modal id="result_modal" data={selectedResult} />
      </div>
    </>
  );
}

export default ViewResult;

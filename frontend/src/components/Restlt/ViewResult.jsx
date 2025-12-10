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
      const response = await axios.get('https://student-automation-system.onrender.com/api/v1/admin/viewresults', {
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

    <div className="bg-gradient-to-br from-lime-100 to-lime-300 min-h-screen p-3 md:p-6 relative">

      {/* Back Button */}
      <div
        className=" btn  h-10 w-10  font-bold text-2xl 
        absolute top-4 left-4 cursor-pointer rounded-full 
        hover:bg-lime-500 bg-lime-400 shadow-md"
        onClick={() => window.history.back()}
      >
        <IoMdArrowRoundBack />
      </div>

      {/* Title */}
      <h1 className="text-center pt-12 md:pt-2 font-bold text-3xl md:text-4xl bg-gradient-to-r from-blue-600 to-blue-900 text-transparent bg-clip-text">
        View Results
      </h1>

      {/* Selection Controls */}
      <div className="flex flex-wrap justify-center gap-4 mt-8 px-4">
        <select
          defaultValue="Select Department"
          className="select select-info bg-white/70 w-full sm:w-56 shadow"
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
          className="select select-info bg-white/70 w-full sm:w-56 shadow"
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

      {/* Exam List Title */}
      <h1 className="mt-8 text-xl md:text-2xl text-white font-bold text-center py-2 rounded-md
        bg-gradient-to-r from-blue-500 to-blue-800 shadow">
        Exam List
      </h1>

      {/* Results List */}
      <div className="max-w-4xl mx-auto mt-6 px-2 md:px-0">
        {loading ? (
          <Loading1 />
        ) : result.length > 0 ? (
          result.map((e, idx) => {
            const date = new Date(e.ExamDate);
            return (
              <div
                key={idx}
                className="flex flex-wrap md:flex-nowrap items-center justify-between 
                bg-white/80 backdrop-blur-md border border-lime-400/50
                rounded-xl shadow-lg px-4 py-3 mb-4
                hover:shadow-xl hover:scale-[1.01] transition-all"
              >
                <p className="w-1/12 text-center font-semibold">{idx + 1}</p>
                <p className="w-5/12 md:w-3/12 font-medium">{e.examName}</p>
                <p className="w-4/12 md:w-3/12 text-gray-700">{date.toLocaleDateString()}</p>

                <a
                  className="text-blue-600 underline cursor-pointer font-semibold mt-2 md:mt-0"
                  onClick={() => handleOpenModal(e)}
                >
                  View Result
                </a>
              </div>
            );
          })
        ) : (
          <h1 className="text-2xl font-bold text-center mt-20 text-gray-600">
            No Data Found
          </h1>
        )}
      </div>

      <Result_modal id="result_modal" data={selectedResult} />
    </div>
  </>
);

}

export default ViewResult;

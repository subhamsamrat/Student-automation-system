import { handleAxiosError } from '@/utils/handleAxiosError';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Result_modal({ data }) {
  const [result, setResult] = useState([]);

  const department = data?.department;
  const year = data?.year;

  useEffect(() => {
    const stdDetails = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/v1/admin/viewstudents', {
          params: { department, year },
        });

        const info = [];
        data.stdResult.forEach((e) => {
          response.data.students.forEach((item) => {
            if (e.stdId === item._id) {
              info.push({
                name: item.studentName,
                rollNo: item.rollNo,
                mark: e.mark,
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

    if (department && year) {
      stdDetails();
    }
  }, [department, year, data]);

  return (
    <dialog id="result_modal" className="modal">
      <div className="modal-box max-w-3xl h-[95vh] overflow-auto hide-scrollbar">
        <button
          onClick={() => document.getElementById('result_modal').close()}
          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
        >
          ✕
        </button>

        <h3 className="font-bold text-2xl underline">Exam Name</h3>
        <div className="flex mt-5">
          <p className="font-bold">Exam Date:-</p>
          <p className="ml-40 font-bold">Full Mark:-</p>
        </div>

        <div className="overflow-auto hide-scrollbar">
          <table className="table">
            <thead>
              <tr className="bg-slate-300 text-black sticky top-0">
                <th>Name</th>
                <th>Roll No</th>
                <th>Mark</th>
                {/* <th>Grade</th> */}
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {result.map((item, index) => (
                <tr key={index}>
                  <td>{item.name}</td>
                  <td>{item.rollNo}</td>
                  <td>{item.mark}</td>
                  {/* <td>{item.mark > 59 ? 'A' : item.mark > 39 ? 'B' : 'C'}</td> */}
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

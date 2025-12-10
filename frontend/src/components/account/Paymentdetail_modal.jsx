import { handleAxiosError } from "@/utils/handleAxiosError";
import axios from "axios";
import React, {useEffect, useState} from "react";


function Paymentdetail_modal({ data }) {

const [department,setDepartment]=useState('');
const [year,setYear]=useState('');
const [stdName,setstdName]=useState('');
const [totalAmount,setTotalAmount]=useState('');
const [paidAmount,setPaidAmount]=useState('');
const [history,setHistory]=useState([]);

  function allstates(){
    setDepartment('');
    setYear('');
    setstdName('');
    setTotalAmount('');
    setPaidAmount('');
    setHistory([]);
  }

  const getData=async ()=>{
             try {
        

                if(data?.stdId){  
                  const res=await axios.get(`https://student-automation-system.onrender.com/api/v1/admin/view_payment/${data.stdId}`,{
                    withCredentials:true,
                    headers:{"Content-Type":"application/json"}
                  });
                  console.log('res=',res);
                  if(res?.data?.message){
                    setDepartment(res.data.record.department);
                    setYear(res.data.record.year);
                    setstdName(res.data.record.studentName);
                    setTotalAmount(res.data.record.totalAmount);
                    setPaidAmount(res.data.record.totalDipositAmount);
                    setHistory(res.data.record.history);
                  };
                }

             } catch (error) {
              console.log("ERROR !!  getting data in payment detail modal",error);
              handleAxiosError(error);
             }
  };

  useEffect(()=>{
    console.log('use Effrct run');
    
    getData();},[data?.stdId]);     
  return (
    <dialog
      id="paymentDetails_modal"
      className="w-full max-w-3xl rounded-2xl p-0 bg-transparent mt-20 md:ml-90"
    >
      <div className="mx-4 bg-gradient-to-b from-white/70 to-black/60 backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden border border-white/20">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-white/20">
          <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
            Student Payment Details
          </h3>
          <button
          
            onClick={()=>{document.getElementById("paymentDetails_modal").close(),allstates()}}
            className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-slate-200/50 dark:hover:bg-white/10"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-slate-700 dark:text-slate-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Student Info */}
        <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-2">
          <div className="p-4 bg-white/60 dark:bg-slate-800/60 rounded-xl border border-white/30 shadow grid gap-1">
            <p className="text-sm text-slate-600 dark:text-slate-300"><span className="font-semibold">Name:</span> {stdName}</p>
            <p className="text-sm text-slate-600 dark:text-slate-300"><span className="font-semibold">Roll No:</span> {data?.rollNo??"----"}</p>
            <p className="text-sm text-slate-600 dark:text-slate-300"><span className="font-semibold">Department:</span> {department}</p>
            <p className="text-sm text-slate-600 dark:text-slate-300"><span className="font-semibold">Year:</span> {year}</p>
          </div>

          {/* Fee Summary */}
          <div className="grid grid-cols-3 gap-3">
            <div className="rounded-xl p-4 bg-blue-500 text-white shadow-lg">
              <p className="text-xs opacity-80">Total Fee</p>
              <p className="text-md font-bold">₹{totalAmount}</p>
            </div>

            <div className="rounded-xl p-4 bg-green-500 text-white shadow-lg">
              <p className="text-xs opacity-80">Paid</p>
              <p className="text-lg font-bold">₹{paidAmount}</p>
            </div>

            <div className="rounded-xl p-4 bg-red-500 text-white shadow-lg">
              <p className="text-xs opacity-80">Remaining</p>
              <p className="text-lg font-bold">₹{(totalAmount ?? 0) - (paidAmount ?? 0)}</p>
            </div>
          </div>
        </div>

        {/* Payment History */}
        <div className="px-5 pb-5">
          <h4 className="text-md font-semibold text-slate-800 dark:text-slate-100 mb-3">
            Payment History
          </h4>

          <div className="overflow-hidden rounded-xl border border-white/20 bg-white/40 ">
            <table className="w-full text-sm">
              <thead className="bg-slate-100/60 ">
                <tr>
                  <th className="p-3 text-left">Payment ID</th>
                  <th className="p-3 text-left">Amount</th>
                  <th className="p-3 text-left">Mode</th>
                  <th className="p-3 text-left">Date</th>
                </tr>
              </thead>

              <tbody>
                {history?.length ? (
                  
                  history.map((h, i) => {
                    const date = new Date(h.date);
                    return (<tr key={i} className="border-t border-white/10 hover:bg-white/40 dark:hover:bg-slate-700/40">
                      <td className="p-3">{h.paymentId}</td>
                      <td className="p-3">₹{h.amount}</td>
                      <td className="p-3">{h.payMode}</td>
                      <td className="p-3">{date.toLocaleDateString()}</td>
                    </tr>);
              })
                ) : (
                  <tr>
                    <td colSpan="4" className="p-4 text-center text-slate-500">
                      No Payment Records Found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </dialog>
  );
}

export default Paymentdetail_modal;

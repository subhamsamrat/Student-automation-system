import React, { useEffect, useRef, useState } from "react";
import Navbar from "../home/Navbar";
import { FaCheckCircle, FaMoneyBillWave, FaWallet } from "react-icons/fa";
import html2pdf from "html2pdf.js";
import axios from "axios";
import { handleAxiosError } from "@/utils/handleAxiosError";
<<<<<<< HEAD
import { BACKEND_URI } from "@/config";
=======
>>>>>>> 6ad45bcb9dcd07d92a868b9b2c3c577d4a243b18

function Account() {
  const invoiceRef = useRef();
  const [filterMode, setFilterMode] = useState("All");
  const [filterDate, setFilterDate] = useState("All");
  const [totalFees, setTotalFees] = useState(0);
  const [remainingFees, setRemainingfees] = useState(0);
  const [paidFees, setPaidFees] = useState(0);
  const [paymentHistory, setPaymentHistory] = useState([]);
  const [department, setDepartment] = useState("");
  const [year, setYear] = useState("");
  const [stdName, setStdName] = useState("");

  const fetchData = async () => {
    try {
<<<<<<< HEAD
      const response = await axios.get(`${BACKEND_URI}/api/v1/student/account`, {
=======
      const response = await axios.get("https://student-automation-system.onrender.com/api/v1/student/account", {
>>>>>>> 6ad45bcb9dcd07d92a868b9b2c3c577d4a243b18
        withCredentials: true,
      });
        console.log(response);
        
      setTotalFees(response.data.PaymentData.totalAmount);
      setRemainingfees(response.data.PaymentData.remainAmount);
      setPaidFees(response.data.PaymentData.totalDipositAmount);
      setPaymentHistory(response.data.PaymentData.history);
      setDepartment(response.data.PaymentData.department);
      setYear(response.data.PaymentData.year);
      setStdName(response.data.PaymentData.studentName);
    } catch (error) {
      handleAxiosError(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filteredData = paymentHistory.filter((item) => {
    return (
      (filterMode === "All" || item.payMode === filterMode) &&
      (filterDate === "All" || item.date === filterDate)
    );
  });

  const downloadPDF = (dataItem) => {
    const element = document.createElement("div");
    element.style.background = "#ffffff";
    element.style.padding = "20px";

    element.innerHTML = `
      <div style="max-width:480px;margin:auto;padding:20px;border:1px solid #1e3a8a;border-radius:10px;">
        <h2 style="text-align:center;color:#1e3a8a;">GANDHI INSTITUTE OF TECHNOLOGY AND MANAGEMENT</h2>
        <p style="text-align:center;font-size:12px;color:gray;">Official Payment Receipt</p>
        <hr />
        <p><strong>Student Name:</strong> ${stdName}</p>
        <p><strong>Roll No:</strong> ${dataItem.rollNo}</p>
        <p><strong>Department:</strong> ${department}</p>
        <p><strong>Year:</strong> ${year}</p>
        <hr />
        <p><strong>Date:</strong> ${dataItem.date}</p>
        <p><strong>Amount:</strong> ₹${Number(dataItem.amount).toFixed(2)}</p>
        <p><strong>Mode:</strong> ${dataItem.payMode}</p>
        <p><strong>Receipt ID:</strong> ${dataItem.paymentId}</p>
      </div>`;

    html2pdf().from(element).save();
  };

  return (
    <>
      <Navbar />

      <div className="bg-slate-100 min-h-screen p-4 md:p-8">
        <h1 className="text-2xl md:text-3xl font-bold text-center mb-6 md:mb-10">
          Payment Dashboard
        </h1>

        {/* Responsive Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-10">
          <div className="bg-blue-600 p-5 rounded-xl text-white flex justify-between items-center shadow-md">
            <div>
              <h2 className="text-xs md:text-sm uppercase">Total Fees</h2>
              <p className="text-2xl md:text-3xl font-bold">₹{totalFees}</p>
            </div>
            <FaMoneyBillWave className="text-4xl md:text-5xl opacity-40" />
          </div>

          <div className="bg-green-600 p-5 rounded-xl text-white flex justify-between items-center shadow-md">
            <div>
              <h2 className="text-xs md:text-sm uppercase">Paid Fees</h2>
              <p className="text-2xl md:text-3xl font-bold">₹{paidFees}</p>
            </div>
            <FaCheckCircle className="text-4xl md:text-5xl opacity-40" />
          </div>

          <div className="bg-rose-600 p-5 rounded-xl text-white flex justify-between items-center shadow-md">
            <div>
              <h2 className="text-xs md:text-sm uppercase">Remaining</h2>
              <p className="text-2xl md:text-3xl font-bold">₹{remainingFees}</p>
            </div>
            <FaWallet className="text-4xl md:text-5xl opacity-40" />
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white p-4 md:p-6 rounded-xl shadow-md mb-6 flex flex-col md:flex-row gap-4 md:gap-20">
          <div>
            <label className="block text-sm mb-1">Filter by Mode</label>
            <select
              onChange={(e) => setFilterMode(e.target.value)}
              className="border p-2 rounded-md w-full md:w-52"
            >
              <option>All</option>
              <option>UPI</option>
              <option>Cash</option>
              <option>Card</option>
              <option>Bank Transfer</option>
            </select>
          </div>

          <div>
            <label className="block text-sm mb-1">Filter by Date</label>
            <select
              onChange={(e) => setFilterDate(e.target.value)}
              className="border p-2 rounded-md w-full md:w-52"
            >
              <option>All</option>
              <option>Current Month</option>
              <option>Last Month</option>
              <option>Last Six Month</option>
              <option>Last 1 year</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl shadow-md p-4 md:p-6 overflow-x-auto">
          <h2 className="text-lg md:text-xl font-semibold mb-4">Transaction History</h2>

          <table className="w-full text-xs md:text-sm border">
            <thead className="bg-gray-300 text-xs md:text-sm">
              <tr>
                <th className="p-2 border">Date</th>
                <th className="p-2 border">Amount</th>
                <th className="p-2 border">Mode</th>
                <th className="p-2 border">Receipt ID</th>
                <th className="p-2 border">Receipt</th>
              </tr>
            </thead>

            <tbody>
              {filteredData.map((item, index) => {
                const date = new Date(item.date);
                return (
                  <tr
                    key={index}
                    className={`${index % 2 === 0 ? "bg-amber-50" : "bg-white"} hover:bg-blue-50`}
                  >
                    <td className="p-2 border">{date.toLocaleDateString()}</td>
                    <td className="p-2 border font-semibold">₹{item.amount}</td>
                    <td className="p-2 border">{item.payMode}</td>
                    <td className="p-2 border">{item.paymentId}</td>
                    <td className="p-2 border">
                      <button
                        onClick={() => downloadPDF(item)}
                        className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-xs"
                      >
                        Download
                      </button>
                    </td>
                  </tr>
                );
              })}

              {filteredData.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-center p-4 text-gray-500">
                    No data found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default Account;

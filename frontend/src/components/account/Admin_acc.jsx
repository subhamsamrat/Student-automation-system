import React, { useEffect, useState } from "react";
import Navbar from "../home/Navbar";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import PayFee_modal from "./PayFee_modal";
import Paymentdetail_modal from "./Paymentdetail_modal";
import axios from "axios";
import { handleAxiosError } from "@/utils/handleAxiosError";
import { FaCcAmazonPay } from "react-icons/fa";
import { BiSolidUserDetail } from "react-icons/bi";
import { BACKEND_URI } from "@/config";

function Admin_acc() {
  const [department, setDepartment] = useState();
  const [year, setYear] = useState();
  const [payProp, setPayProp] = useState(null);
  const [monthlyCollection, setMonthlyCollection] = useState([]);
  const [totalCollection, setTotalcollection] = useState("");
  const [student, setStudent] = useState([]);
  const [loading, setLoading] = useState(false);

  const adminData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${BACKEND_URI}/api/v1/admin/admin_account`,

        {
          params: { department, year },
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );

      setMonthlyCollection(response.data.monthlyCollection);
      setTotalcollection(response.data.totalcollection);
      setStudent(response.data.students);
      setLoading(false);
    } catch (error) {
      handleAxiosError(error);
    }
  };

  useEffect(() => {
    adminData();
  }, [department, year]);

  const handlePayment = (e) => {
    setPayProp(e);
    document.getElementById("payFee_modal").showModal();
  };

  const handlePaymentDetail = (e) => {
    setPayProp(e);
    document.getElementById("paymentDetails_modal").showModal();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="p-4 md:p-6 space-y-8 w-full max-w-7xl mx-auto">
        {/* HEADER */}
        <h1 className="text-2xl md:text-3xl font-bold">Accounts & Payments Dashboard</h1>

        {/* TOP CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2  gap-4">
          {[
            {
              title: "Total Fees Collected",
              value: `₹ ${totalCollection}`,
            },
            { title: "Pending Fees", value: "₹ --------" },
            // { title: "Students Paid", value: "420" },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-fuchsia-500/20 shadow-md rounded-2xl p-4 border border-fuchsia-400"
            >
              <p className="text-sm text-gray-700">{item.title}</p>
              <p className="text-xl md:text-2xl font-bold mt-1">{item.value}</p>
            </div>
          ))}
        </div>

        {/* CHARTS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white rounded-2xl shadow-md h-64 p-4 border relative">
            <h1 className="text-lg font-bold absolute -top-5 bg-white px-2">Monthly Collections</h1>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={monthlyCollection}
                margin={{ top: 20, right: 20, left: -20, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.9} />
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0.2} />
                  </linearGradient>
                </defs>

                <CartesianGrid strokeDasharray="4 4" stroke="#e5e7eb" />
                <XAxis
                  dataKey="name"
                  tick={{ fill: "#6b7280", fontSize: 10 }}
                  axisLine={false}
                />
                <YAxis
                  tick={{ fill: "#6b7280", fontSize: 10 }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="collection_amount"
                  stroke="#6366f1"
                  strokeWidth={3}
                  fill="url(#colorPv)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Placeholder second chart */}
          <div className="bg-white rounded-2xl shadow-md h-64 flex items-center justify-center text-gray-500 border">
            <p className="text-center">Fee Breakdown Chart</p>
          </div>
        </div>

        {/* FILTERS */}
        <div className="bg-white p-4 rounded-2xl shadow-md border">
          <h1 className="font-bold text-xl mb-4">Filters</h1>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <select
              defaultValue="By Department"
              className="select select-info w-full"
              onChange={(e) => setDepartment(e.target.value)}
            >
              <option disabled>By Department</option>
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
              defaultValue="By Year"
              className="select select-info w-full"
              onChange={(e) => setYear(e.target.value)}
            >
              <option disabled>By Year</option>
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

            <button
              onClick={() => window.location.reload()}
              className="btn bg-amber-400 w-full rounded-xl"
            >
              Clear Filters
            </button>
          </div>
        </div>

        {/* STUDENT TABLE */}
        {loading ? (
          <div className="flex justify-center items-center h-40">
            <span className="loading loading-bars loading-lg"></span>
          </div>
        ) : student.length === 0 ? (
          <div className="flex justify-center items-center text-xl font-bold h-40">
            <h1>No Student Found</h1>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-md border overflow-x-auto">
            <table className="w-full text-sm text-center">
              <thead>
                <tr className="border-b bg-gray-200">
                  <th className="p-2">Name</th>
                  <th className="p-2">Roll No</th>
                  <th className="p-2">Options</th>
                </tr>
              </thead>

              <tbody>
                {student.map((e, idx) => (
                  <tr key={idx} className="border-b hover:bg-gray-100">
                    <td className="p-2">{e.studentName}</td>
                    <td className="p-2">{e.rollNo}</td>
                    <td className="p-2 flex justify-center gap-6">
                      <button
                        onClick={() =>
                          handlePayment({
                            stdId: e.stdId,
                            name: e.studentName,
                            rollNo: e.rollNo,
                          })
                        }
                        className="text-green-600 text-2xl hover:scale-110 transition"
                      >
                        <FaCcAmazonPay />
                      </button>

                      <button
                        onClick={() =>
                          handlePaymentDetail({ stdId: e.stdId, rollNo: e.rollNo })
                        }
                        className="text-blue-600 text-2xl hover:scale-110 transition"
                      >
                        <BiSolidUserDetail />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Modals */}
            <PayFee_modal id="payFee_modal" data={payProp} />
            <Paymentdetail_modal id="paymentDetails_modal" data={payProp} />
          </div>
        )}
      </div>
    </div>
  );
}

export default Admin_acc;

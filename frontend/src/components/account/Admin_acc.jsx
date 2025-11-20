import React, { useState } from 'react'
import Navbar from '../home/Navbar'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,ResponsiveContainer } from 'recharts';
import PayFee_modal from './PayFee_modal';
import Paymentdetail_modal from './Paymentdetail_modal';


function Admin_acc() {
  const [department,setDepartment]=useState();
  const [payment,setPayment]=useState(null);
 const data = [
  { name: 'Jan', collect_amount: 2400 },
  { name: 'Feb', collect_amount: 2398 },
  { name: 'Mar', collect_amount: 9800 },
  { name: 'Apr', collect_amount: 3908 },
  { name: 'May', collect_amount: 4800 },
  { name: 'Jun', collect_amount: 3800 },
  { name: 'July', collect_amount: 4300 },
  { name: 'Aug', collect_amount: 4300 },
  { name: 'Sep', collect_amount: 4300 },
  { name: 'Oct', collect_amount: 300 },
  { name: 'Nov', collect_amount: 0 },
  { name: 'Dec', collect_amount: 200 },
];

  const handlePayment=(e)=>{
      setPayment(e);
      document.getElementById('payFee_modal').showModal();
      
  }

  const handlePaymentDetail=(e)=>{
    setPayment(e);
    document.getElementById("paymentDetails_modal").showModal();
  }

 return (
       <div>
    <Navbar />
    <div className="p-6 space-y-8 w-full">

      {/* HEADER */}
      <h1 className="text-3xl font-bold">Accounts & Payments Dashboard</h1>

      {/* TOP CARDS */}
      <div className="flex  justify-around  gap-">
        {[
          { title: "Total Fees Collected", value: "₹ 14,20,000" },
          { title: "Pending Fees", value: "₹ 3,50,000" },
          { title: "Students Paid", value: "420" },
        ].map((item, i) => (
          <div
            key={i}
            className="bg-fuchsia-500/30 shadow-md rounded-2xl p-4 border border-fuchsia-600 w-120"
          >
            <p className="text-sm text-gray-600">{item.title}</p>
            <p className="text-xl font-bold mt-1">{item.value}</p>
          </div>
        ))}
      </div>

        {/* CHART PLACEHOLDERS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             <h1 className='absolute top-67 text-xl font-bold bg-white ml-8'>Monthly collections</h1>
        <div className="bg-white rounded-2xl shadow-md h-64 p-4 border ">
 <ResponsiveContainer width="100%" height="100%">
  <AreaChart data={data} margin={{ top: 20, right: 20, left: -20, bottom: 0 }}>
    
    {/* Custom Gradient */}
    <defs>
      <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
        <stop offset="5%" stopColor="#6366f1" stopOpacity={0.9}/>
        <stop offset="95%" stopColor="#6366f1" stopOpacity={0.2}/>
      </linearGradient>
    </defs>

    {/* Light Grid */}
    <CartesianGrid strokeDasharray="4 4" stroke="#e5e7eb" />

    {/* Remove axis strokes & customize font */}
    <XAxis dataKey="name" tick={{ fill: "#6b7280", fontSize: 12 }} axisLine={false} />
    <YAxis domain={[0, 'dataMax + 200']}
  tick={{ fill: "#6b7280", fontSize: 10 }}
   tickFormatter={(val) => {
    if (val >= 10000000) return `${(val / 10000000).toFixed(1)} Cr`;
    if (val >= 100000) return `${(val / 100000).toFixed(1)} L`;
    if (val >= 1000) return `${(val / 1000).toFixed(1)}k`;
    return val;
  }}
  axisLine={false}
  tickLine={false} />

    {/* Nice tooltip */}
    <Tooltip
      contentStyle={{ borderRadius: "10px", padding: "8px", border: "none" }}
      labelStyle={{ color: "#6366f1", fontWeight: "bold" }}
    />

    {/* Custom area */}
   <Area
  type="monotone"
  dataKey="collect_amount"
  stroke="#6366f1"
  strokeWidth={3}
  fillOpacity={1}
  fill="url(#colorPv)"
  animationDuration={1200}
/>

  </AreaChart>
</ResponsiveContainer>

</div>


         <div className="bg-white rounded-2xl shadow-md h-64 flex items-center justify-center text-gray-500 border">
          <p className="text-center">Fee Breakdown Chart </p>
        </div>

      </div>

      {/* FILTERS */}
      <div className="bg-white p-4 rounded-2xl shadow-md border">

        <div className="flex md:flex-row flex-col gap-5">

         <h1 className='font-bold text-xl absolute top-161 md:top-139 bg-white md:ml-5'>Filters</h1>

          <select
            defaultValue="By Department"
            className="select select-info"
           onChange={(e)=> setDepartment(e.target.value)}
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
            className="select select-info "
          
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

          {/* <select
          defaultValue='By Payment Mode'
          className='select select-info'
          >
             <option disabled>By Payment Mode</option>
            <option value="">UPI</option>
            <option value="">Bank Transfer</option>
            <option value="">Cash</option>
            <option value="">Card</option>
          </select>

           <select
          defaultValue='By Date'
          className='select select-info'
          >
             <option disabled >By Date</option>
            <option value="">This Month</option>
            <option value="">Last Month</option>
          </select> */}
          <button
          onClick={(e)=>{ window.location.reload();}}
          className='w-30 text-[] border-1 btn ml-100 rounded-xl'>
            Clear Filters
          </button>
          <button className="bg-blue-600 text-white p-2 rounded-xl w-30 btn">
            Apply
          </button>
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-2xl shadow-md border overflow-x-auto md:mx-20">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className='border-b bg-gray-200'>
              <th className='p-2 pl-10'>Name</th>
              <th className='pl-3'>Rollno</th>
              <th className='pl-3'>Year</th>
              <th className='pl-4'>Options</th>
            </tr>
          </thead>

          <tbody>
            {[1, 2, 3,4,5,6].map((id) => (
              <tr key={id} className="border-b hover:bg-gray-100">
                <td className="py-2 px-3">Rakesh Kumar</td>
                <td className="px-3">22CS10</td>
                <td className="px-3">3rd yr</td>
                
               
                <td className="px-3 flex gap-5">
                 <a onClick={()=>{handlePayment(id)}} className='underline py-1.5 text-green-500 text-[12px] cursor-pointer'>pay</a>
                    <a onClick={()=>{handlePaymentDetail(id)}} className='underline py-1.5 text-blue-500 text-[12px] cursor-pointer'>Detail</a>
                </td>
              </tr>
            ))}
          </tbody>
        </table> 
        <PayFee_modal id="payFee_modal" data={payment}/>
        <Paymentdetail_modal id="paymentDetails_modal" data={payment}/>
      </div>

    

    </div>
    </div>
    );}

export default Admin_acc;

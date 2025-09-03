import React from 'react'
import Navbar from '../home/Navbar'

function Account() {
    const data = [
  {
 date:"2025.08.12",
   Amount:'12345',
   Mode: "upi",
   RecieptID:'124332',
   status:'Success'
  },
  
];
  return (
    <>
      <Navbar/>
      <div className=''>
        <div className='h-full text-center'>
          <h1 className='md:text-3xl text-2xl font-bold mt-3 underline'>Payment Information</h1>
        </div>
        <div className='md:h-40 flex items-center justify-evenly gap-2 flex-wrap md:text-4xl text-3xl  text-center font-bold text-white md:mt-10 mt-5'>
          <div className='h-30 md:w-90 w-105 border-1 border-black  rounded-xl bg-blue-700 hover:shadow-md px-9.5 py-6'>Total Fees 10000</div>
          <div className='h-30 md:w-90 w-105 border-1 border-black  rounded-xl bg-green-500 px-9.5 py-6'>Remaining Fees 20000</div>
          <div className='h- md:w-90 w-105 border-1 border-black  rounded-xl bg-rose-400 px-9.5 py-6'>Paid Fees 23999</div>
        </div>
        <div className=' md:mx-20 mt-10'>
                  <table className="table md:w-full w-50">
             <thead>
               <tr className='bg-slate-300 text-black  sticky top-18'>
                 <th>date</th>
                 <th>Amount</th>
                  <th>Mode</th>
                  <th>Reciept ID</th>
                  <th>Status</th>
               </tr>
             </thead>
             <tbody className=''>
               {
                data.map((item,index)=>(
                  <tr key={index} className=''>
                 <td>{item.date}</td>
                 <td>{item.Amount}</td>
                 <td>{item.Mode}</td>
                  <td>{item.RecieptID}</td> 
                  <td>{item.status}</td> 
               </tr>
                ))
               }
             </tbody>
           </table>
        </div>
      </div>
    </>
  )
}

export default Account

import React from 'react'
import Navbar from '../home/Navbar'
//import Result_graph from './Result_graph'

function Result() {
           const data = [
  {
   name: 'John Doe',
   rollNo: '12345',
   average:29,
   ststus:'pass'
  },
   {
  name: 'John Doe',
   rollNo: '12345',
   average: 85,
   ststus:'pass'
  },
   {
   name: 'John Doe',
   rollNo: '12345',
   average: 85,
   ststus:'pass'
  },
   {
 name: 'John Doe',
   rollNo: '12345',
   average: 30,
   ststus:'pass'
  },
   {
 name: 'John Doe',
   rollNo: '12345',
   average: 30,
   ststus:'pass'
  },
   {
 name: 'John Doe',
   rollNo: '12345',
   average: 30,
   ststus:'pass'
  },
  {
 name: 'John Doe',
   rollNo: '12345',
   average: 30,
   ststus:'pass'
  },
  {
 name: 'John Doe',
   rollNo: '12345',
   average: 30,
   ststus:'pass'
  },
  {
 name: 'John Doe',
   rollNo: '12345',
   average: 30,
   ststus:'pass'
  },
  {
 name: 'John Doe',
   rollNo: '12345',
   average: 30,
   ststus:'pass'
  },
  {
 name: 'John Doe',
   rollNo: '12345',
   average: 30,
   ststus:'pass'
  },
  {
 name: 'John Doe',
   rollNo: '12345',
   average: 30,
   ststus:'pass'
  },
  {
 name: 'John Doe',
   rollNo: '12345',
   average: 30,
   ststus:'pass'
  },
  {
 name: 'John Doe',
   rollNo: '12345',
   average: 30,
   ststus:'pass'
  },
  {
 name: 'John Doe',
   rollNo: '12345',
   average: 30,
   ststus:'pass'
  },
  {
 name: 'John Doe',
   rollNo: '12345',
   average: 30,
   ststus:'pass'
  },
  {
 name: 'John Doe',
   rollNo: '12345',
   average: 30,
   ststus:'pass'
  },
  {
 name: 'John Doe',
   rollNo: '12345',
   average: 30,
   ststus:'pass'
  },
  {
 name: 'John Doe',
   rollNo: '12345',
   average: 30,
   ststus:'pass'
  },
  {
 name: 'John Doe',
   rollNo: '12345',
   average: 30,
   ststus:'pass'
  },
  {
 name: 'John Doe',
   rollNo: '12345',
   average: 30,
   ststus:'pass'
  },
];
  return (
    <>
    <div>
    <Navbar/>    
    <div>
        <h1 className='text-3xl font-bold underline text-center'>Results</h1>
        <div>
          
        </div>
    </div>
    
     {/* <div className='bg-amber-100  h-full md:w-full w-109 text-black p-10'>
           <table className="table">
             <thead>
               <tr className='bg-slate-300 text-black  sticky top-18'>
                 <th>Name</th>
                 <th>Roll No</th>
                  <th>Average</th>
                  <th>Grade</th>
                  <th>Status</th>
               </tr>
             </thead>
             <tbody className=''>
               {
                data.map((item,index)=>(
                  <tr key={index} className=''>
                 <td>{item.name}</td>
                 <td>{item.rollNo}</td>
                 <td>{item.average}%</td>
                 <td>{item.average>59 && item.average<101 ?'A':item.average>39?'B':'C'}</td>
                 <td>{item.average<30?'Fail':'Pass'}</td>
               </tr>
                ))
               }
             </tbody>
           </table>
       </div> */}
    
    </div> 
    </>
  )
}

export default Result

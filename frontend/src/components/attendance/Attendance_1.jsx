import axios from "axios";
import { Cookie } from "lucide-react";
import React, { PureComponent, useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
function Attendance_1() {

  //this is for responsiveness
  const [mob, setMob] = useState('');
  const [data,setData]= useState();

  useEffect(() => {
    if (window.innerWidth > 450) {
      setMob(true);
    
    }else{
      setMob(false);
    }
  }, []);

useEffect(()=>{
     (
      async()=>{
        const response=await axios.get('http://localhost:4000/api/v1/student/attendance',{
          withCredentials: true,
          headers: { "content-type": "application/json" }, credentials: 'include',
        });
          const data=response.data.data;
        setData(data);
        
      }
     )();   
     
     
    // console.log(cookieStore.getItem('token'));
    
},[])  

  // const std = [{ p: 12, a: 16 }];
  // const data = [
  //   {
  //     name: "january",
  //     present: std[0].p,
  //     absent: std[0].a,
  //   },
  //   {
  //     name: "february",
  //     present: 31,
  //     absent: 13,
  //   },
  //   {
  //     name: "march",
  //     present: 20,
  //     absent: 12,
  //   },
  //   {
  //     name: "april",
  //     present: 27,
  //     absent: 2,
  //   },
  //   {
  //     name: "may",
  //     present: 18,
  //     absent: 12,
  //   },
  //   {
  //     name: "june",
  //     present: 23,
  //     absent: 7,
  //   },
  //   {
  //     name: "july",
  //     present: 15,
  //     absent: 15,
  //   },
  //   {
  //     name: "august",
  //     present: 20,
  //     absent: 10,
  //   },
  //   {
  //     name: "september",
  //     present: 25,
  //     absent: 5,
  //   },
  //   {
  //     name: "october",
  //     present: 30,
  //     absent: 0,
  //   },
  //   {
  //     name: "november",
  //     present: 28,
  //     absent: 2,
  //   },
  //   {
  //     name: "december",
  //     present: 0,
  //     absent: 0,
  //   },
  // ]; 


// ${mob ? '' : 'bg-gradient-to-l form-fuchsia-600 to-amber-400 text-[5vw]'}
  return (
    <>
      <div className="h-100 w-full md:flex">
        <div className="md:w-1/2 h-full  ">
          <h1 className={`text-center md:text-2xl text-[5.5vw] mt-5 font-bold mb-5 md:bg-gradient-to-l  bg-gradient-to-r from-fuchsia-600 md:to-white `}>
            -:Bar Diagram of Your Attendance:-
          </h1>
          <ResponsiveContainer width="100%" height="100%" >
            <BarChart
            className="md:text-sm text-[3vw] "
              width={500}
              height={300}
              data={data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar
                dataKey="present"
                fill="#3DE83A"
                background={{ fill: "#eee" }}
              />
              <Bar dataKey="absent" fill="#F53B3B" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {
          mob?<div className="flex flex-col justify-center items-center ">
          <div className="border-1 h-1/2"></div>
          <div className="bg-gradient-to-r  from-fuchsia-500 to-amber-400 h-15 w-15 rounded-full flex justify-center items-center text-3xl font-bold">
            1
          </div>
          <div className="border-1 h-1/2"></div>
        </div>:''
        }

        <div className="md:w-1/2 h-full  ">
          <h1 className="text-center text-2xl font-bold mt-25 md:bg-gradient-to-r bg-gradient-to-r from-amber-500 to-white">
            <u>Bar Diagram</u>
          </h1>
          <p className="text-center text-sm md:mx-20 mx-5 mt-5">
            For better understanding of your attendance, please refer to the bar
            diagram. In the diagram, you can see the comparison between your
            present and absent days for each month. The red bars represent
            absent days, while the green bars represent present days.
          </p>
        </div>
      </div>
    </>
  );
}

export default Attendance_1;

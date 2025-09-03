import { useEffect, useState } from "react";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";

function Attendance_2() {
  const data = [
    { name: "Group A", value: 5 },
    { name: "Group B", value: 5 },
    { name: "Group C", value: 20 },
    // { name: 'Group D', value: 200 },
  ];

  const COLORS = ["#ff1a1a", " #33cc33", "#0066ff", "#FF8042"];
  const RADIAN = Math.PI / 180;

  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor="middle"
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

     const [mob, setMob] = useState(false);
     useEffect(() => {
       if (window.innerWidth > 450) {
         setMob(true);
       
       }else{
         setMob(false);
       }
      }, []);

  return (
    <div className="h-100 w-full md:flex ">
      <div className="md:w-1/2 md:h-full">
        <h1 className="text-center text-2xl font-bold md:mt-30 mt-100 md:bg-gradient-to-l bg-gradient-to-r from-fuchsia-600 ">
          <u>Pi Chat Diagram</u>
        </h1>
        <p className="text-center text-sm md:mx-15 mx-5 mt-5">
          
          This diagram represents the distribution of attendance across
          different groups in your department. Each segment of the pie chart
          corresponds to a specific group, with the size of the segment
          indicating the proportion of total attendance.
        </p>
      </div>

       {
          mob?<div className="flex flex-col justify-center items-center ">
          <div className="border-1 h-1/2"></div>
          <div className="bg-gradient-to-r from-fuchsia-500 to-amber-400 h-15 w-15 rounded-full flex justify-center items-center text-3xl font-bold">
            2
          </div>
          <div className="border-1 h-1/2"></div>
        </div>:''
        }

      <div className="md:w-1/2 h-full">
        <h1 className="text-center md:text-2xl text-[5vw] font-bold mt-10 bg-gradient-to-r from-amber-600 ">
          -:Pi Diagram of your Department Attendance:-
        </h1>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${entry.name}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default Attendance_2;

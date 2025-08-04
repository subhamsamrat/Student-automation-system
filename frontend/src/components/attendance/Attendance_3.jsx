import React from "react";

function Attendance_3() {
  const std = [
    { name: "John Doe", rollNo: "12345", attendance: "85%" },
    { name: "Jane Smith", rollNo: "456345", attendance: "90%" },
    { name: "Alice Johnson", rollNo: "789345", attendance: "78%" },
    { name: "Bob Brown", rollNo: "101345", attendance: "92%" },
    { name: "Charlie Davis", rollNo: "102345", attendance: "88%" },
    { name: "Eve White", rollNo: "10334", attendance: "95%" },
    { name: "Frank Black", rollNo: "104345", attendance: "80%" },
    { name: "Grace Green", rollNo: "105435", attendance: "87%" },
    { name: "Hank Blue", rollNo: "106345", attendance: "82%" },
    { name: "Ivy Yellow", rollNo: "107435", attendance: "91%" },
    { name: "Jack Red", rollNo: "108345", attendance: "89%  " },
    { name: "Kathy Purple", rollNo: "109345", attendance: "84%" },
    { name: "Leo Orange", rollNo: "110345", attendance: "93%" },
    { name: "Mia Pink", rollNo: "111345", attendance: "86%" },
    { name: "Nina Cyan", rollNo: "112345", attendance: "81%" },
  ];
  const sortedStudents = [...std].sort((a, b) => a.name.localeCompare(b.name));
  return (
    <>
      <div>
        <div className="md:h-20 h-10 w-full bg-gradient-to-r from-blue-600 to-rose-500 flex items-center justify-center mt-30 md:mt-0.5">
          <h1 className="text-center text-2xl font-bold">
            <u>Detail view</u>
          </h1>
        </div>

        <div className=" h-full">
          <div>
            <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100 ">
              <table className="table w-full"> 
                {/* head */}
                <thead>
                  <tr className="text-black font-bold text-[3.5vw] md:text-xl">
                    <th></th>
                    <th>
                      <u>Name</u>
                    </th>
                    <th>
                      <u>Roll No</u>
                    </th>
                    <th>
                      <u>Attendance</u>
                    </th>
                  </tr>
                </thead>
                {
                  /* body */
                  <tbody className="">
                    {sortedStudents.map((student, index) => (
                      <tr
                        key={index}
                        className="bg-gradient-to-l from-yellow-300 hover:bg-gray-300 text-[3vw] md:text-[1vw]"
                      >
                        <th>{index + 1}</th>
                        <td>{student.name}</td>
                        <td>{student.rollNo}</td>
                        <td>{student.attendance}</td>
                      </tr>
                    ))}
                  </tbody>
                }
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Attendance_3;

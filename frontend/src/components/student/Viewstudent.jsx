import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaFilter } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import Navbar from "../home/Navbar";
import { handleAxiosError } from "@/utils/handleAxiosError";
import axios from "axios";
import { Loading1 } from "@/utils/Loading";
import ViewProfileModal from "./ViewProfile"; 
import Editstudent from "../student/Editstudent"; 
import { MdDelete } from "react-icons/md";
import DltStdModal from "./DltStdModal";

export default function Viewstudent() {
  const [students, setStudents] = useState([]);
  const [Data, setData] = useState(null); 
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [loading, setLoading] = useState(false);

  const [department, setDepartment] = useState("");
  const [year, setYear] = useState("");

  // control modals
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDltOpen,setIsDltOpen]=useState(false);

  const navigate = useNavigate();

  const apiData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "http://localhost:4000/api/v1/admin/viewallstudent",
        { withCredentials: true }
      );
      setStudents(response.data);
      setFilteredStudents(response.data);
    } catch (error) {
      console.log("ERROR !! in view Student.jsx", error);
      handleAxiosError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    apiData();
  }, []);

  useEffect(() => {
    let data = students;
    if (department) data = data.filter((s) => s.department === department);
    if (year) data = data.filter((s) => String(s.year) === String(year));
    setFilteredStudents(data);
  }, [department, year, students]);

  // open view modal
  const handleViewStd = (student) => {
    setData(student);
    setIsViewOpen(true);
  };

  // open edit modal
  const handleEditStd = (student) => {
    setData(student);
    setIsEditOpen(true);
  };

  //open delete modal
  const handleDltStd=(student)=>{
    console.log();
    
    setData(student);
    setIsDltOpen(true);
  }

  return (
    <>
      <Navbar />
     <div className="min-h-screen bg-gradient-to-bl from-[#6b89e3] via-[#0b1212] to-[#792597] px-4 sm:px-6 md:px-14 py-10">
  <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-white mb-10 tracking-wide">
    Student Directory
  </h1>

  {/* FILTER BAR */}
  <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-lg p-5 sm:p-6 mb-10 max-w-5xl mx-auto border border-white/40">
    <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-5">
      <div className="flex items-center gap-2">
        <FaFilter className="text-teal-600" />
        <p className="font-semibold text-gray-700 text-lg">Filters</p>
      </div>

      <button
        className="btn sm:ml-auto bg-amber-500 hover:scale-105 transition w-full sm:w-auto"
        onClick={() => navigate("/addstudent")}
      >
        Add Student
      </button>
    </div>

    {/* Filters Section */}
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      {/* Department */}
      <div className="flex flex-col gap-2">
        <label className="text-sm text-gray-600 font-medium">Department</label>
        <select
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          className="border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-teal-500 bg-gray-50 hover:bg-white transition"
        >
          <option value="">All Departments</option>
          <option>+2-Science</option>
          <option>+3-Science</option>
          <option>BCA</option>
          <option>BBA</option>
          <option>BBT</option>
          <option>B-Tech</option>
          <option>MBA</option>
          <option>MCA</option>
        </select>
      </div>

      {/* Year */}
      <div className="flex flex-col gap-2">
        <label className="text-sm text-gray-600 font-medium">Year</label>
        <select
          value={year}
          onChange={(e) => setYear(e.target.value)}
          className="border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-teal-500 bg-gray-50 hover:bg-white transition"
        >
          <option value="">All Years</option>

          {department === "+2-Science" || department === "MBA" || department === "MCA" ? (
            <>
              <option value="1st yr">1st year</option>
              <option value="2nd yr">2nd year</option>
            </>
          ) : department === "BCA" ||
            department === "BBA" ||
            department === "BBT" ||
            department === "+3-Science" ? (
            <>
              <option value="1st yr">1st year</option>
              <option value="2nd yr">2nd year</option>
              <option value="3rd yr">3rd year</option>
            </>
          ) : department === "B-Tech" ? (
            <>
              <option value="1st yr">1st year</option>
              <option value="2nd yr">2nd year</option>
              <option value="3rd yr">3rd year</option>
              <option value="4th yr">4th year</option>
            </>
          ) : null}
        </select>
      </div>
    </div>
  </div>

    
  <div className="hidden md:flex bg-gradient-to-r from-teal-600 to-cyan-600 text-white px-6 py-4 rounded-xl font-semibold text-sm mb-4 max-w-6xl mx-auto">
    <p className="w-[25%]">Student</p>
    <p className="w-[20%]">Roll No</p>
    <p className="w-[20%]">Department</p>
    <p className="w-[15%]">Year</p>
    <p className="w-[20%] text-center">Action</p>
  </div>

  {/* Students */}
  {loading ? (
    <div>
      <Loading1 />
    </div>
  ) : filteredStudents.length === 0 ? (
    <p className="text-center text-xl text-red-300">No students found</p>
  ) : (
    <div className="space-y-3 max-w-6xl mx-auto">
      {filteredStudents.map((student, index) => (
        <div
          key={index}
          className="bg-white/80 backdrop-blur-md p-4 sm:p-5 rounded-2xl shadow-lg flex flex-col md:flex-row md:h-15
                     md:items-center justify-between border-l-8 border-red-500 gap-1 hover:scale-[1.005] transition"
        >
          
          {/* Student Name */}
          <div className="md:w-[25%] w-full flex items-center gap-3">
            <img
              src={
                (student.image && student.image.url) ||
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFi74mB1mAjXESb3Sb3ikYHfshZ4D4ZkMyWQ&s"
              }
              className="w-12 h-12 rounded-full object-cover border"
              alt="student"
            />
            <p className="font-semibold text-gray-800 text-lg">
              {student.studentName || student.studentname || student.fullName}
            </p>
          </div>

          {/* Roll No */}
          <p className="md:w-[20%] w-full text-gray-600 font-medium">
            {student.rollNo || student.regno}
          </p>

          {/* Department */}
          <p className="md:w-[20%] w-full text-gray-600 font-medium">
            {student.department}
          </p>

          {/* Year */}
          <p className="md:w-[15%] w-full text-gray-600 font-medium">
            {student.year}
          </p>

          {/* Action Buttons */}
          <div className="flex flex- gap-2 items-center md:w-[20%] justify-start md:justify-center">
            <div
              onClick={() => handleEditStd(student)}
              className="cursor-pointer flex items-center gap-2 px-3 py-1 rounded-2xl bg-gradient-to-l 
                         from-yellow-300 to-red-300 hover:scale-105 transition text-sm"
            >
              <MdEdit />
              <span>Edit</span>
            </div>

            <button
              onClick={() => handleViewStd(student)}
              className="px-3 h-7 py-1 text-[11px] bg-gradient-to-r from-yellow-300 to-blue-400 rounded-full 
                         flex items-center gap-2 hover:scale-105 transition"
            >
              <FaEye />
              <span>View</span>
            </button>

            <button
              onClick={() =>{ handleDltStd({student:student.studentName,stdId:student._id})}}
              className="h-7 w-14 bg-gradient-to-r from-blue-500 via-red-400 to-red-500 
                         rounded-2xl flex items-center justify-center hover:scale-105 transition"
            >
              <MdDelete />
            </button>
          </div>
        </div>
      ))}
    </div>
  )}

  {/* MODALS */}
  <ViewProfileModal open={isViewOpen} onClose={() => setIsViewOpen(false)} data={Data} />

  <Editstudent open={isEditOpen} onClose={() => setIsEditOpen(false)} data={Data} />

  <DltStdModal open={isDltOpen} onClose={() => setIsDltOpen(false)} data={Data} />
</div>

    </>
  );
}

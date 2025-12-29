import React, { useState } from 'react';
import Navbar from '../home/Navbar';
import { handleAxiosError } from '@/utils/handleAxiosError';
import axios from 'axios';
import { Loading2 } from '@/utils/Loading2';
import toast from 'react-hot-toast';
import { BACKEND_URI } from '@/config';

function Addstudent() {

  const [studentname, setStudentname] = useState("");
  const [dob, setDob] = useState("");
  const [image, setImage] = useState("");
  const [rollno, setRollno] = useState("");
  const [gender, setGender] = useState("");
  const [parentname, setParentname] = useState("");
  const [parentphone, setParentphone] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [department, setDepartment] = useState("");
  const [year, setYear] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("studentName", studentname);
    formData.append("DOB", dob);
    formData.append("rollNo", rollno);
    formData.append("gender", gender);
    formData.append("parentName", parentname);
    formData.append("parentPhoneNo", parentphone);
    formData.append("city", city);
    formData.append("state", state);
    formData.append("email", email);
    formData.append("phoneNo", phone);
    formData.append("department", department);
    formData.append("year", year);
    formData.append("image", image);

    try {
      setLoading(true);

      const response = await axios.post(

        `${BACKEND_URI}/api/v1/admin/addstudent`,
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      toast.success(response.data.message);
    } catch (error) {
      handleAxiosError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      {/* FULL SCREEN LOADER OVERLAY */}
      {loading && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-[9999]">
          <Loading2 />
        </div>
      )}

      <div
        className={`min-h-screen bg-gradient-to-br from-teal-100 to-indigo-100 flex items-center justify-center p-4
        ${loading ? "pointer-events-none opacity-60" : ""}`}
      >
        <form
          onSubmit={handleSubmit}
          className="bg-white w-full max-w-6xl rounded-3xl shadow-xl p-6 md:p-10"
        >
          <h2 className="text-center text-3xl font-bold text-teal-600 mb-6">
            Student Registration Form
          </h2>

          {/* STUDENT INFORMATION */}
          <h3 className="text-xl font-semibold mb-4 text-gray-700 border-b pb-1">
            📘 Student Information
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              type="text"
              placeholder="Full Name"
              required
              value={studentname}
              onChange={(e) => setStudentname(e.target.value)}
              className="input-style"
            />

            <input
              type="date"
              required
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              className="input-style"
            />

            <input
              type="text"
              placeholder="Roll No."
              required
              value={rollno}
              onChange={(e) => setRollno(e.target.value)}
              className="input-style"
            />

            <input
              type="file"
              required
              onChange={(e) => setImage(e.target.files[0])}
              className="file-style md:col-span-2"
            />

            <select
              required
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="input-style"
            >
              <option value="">Select Gender</option>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
          </div>

          {/* PARENT INFORMATION */}
          <h3 className="text-xl font-semibold mt-8 mb-4 text-gray-700 border-b pb-1">
            👨‍👩‍👧 Parent Information
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Father / Mother Name"
              required
              value={parentname}
              onChange={(e) => setParentname(e.target.value)}
              className="input-style"
            />

            <input
              type="number"
              placeholder="Parent Phone Number"
              required
              value={parentphone}
              onChange={(e) => setParentphone(e.target.value)}
              className="input-style"
            />
          </div>

          {/* ADDRESS */}
          <h3 className="text-xl font-semibold mt-8 mb-4 text-gray-700 border-b pb-1">
            🏠 Address
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="City / Village"
              required
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="input-style"
            />

            <input
              type="text"
              placeholder="State"
              required
              value={state}
              onChange={(e) => setState(e.target.value)}
              className="input-style"
            />
          </div>

          {/* CONTACT INFORMATION */}
          <h3 className="text-xl font-semibold mt-8 mb-4 text-gray-700 border-b pb-1">
            📞 Contact Information
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="email"
              placeholder="Email Address"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-style"
            />

            <input
              type="number"
              placeholder="Student Phone Number"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="input-style"
            />
          </div>

          {/* DEPARTMENT INFO */}
          <h3 className="text-xl font-semibold mt-8 mb-4 text-gray-700 border-b pb-1">
            🎓 Department Information
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <select
              required
              defaultValue="Select Department"
              onChange={(e) => setDepartment(e.target.value)}
              className="input-style"
            >
              <option disabled>Select Department</option>
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
              required
              defaultValue="Select Year"
              onChange={(e) => setYear(e.target.value)}
              className="input-style"
            >
              <option disabled>Select Year</option>

              {department === '+2-Science' ||
              department === 'MBA' ||
              department === 'MCA' ? (
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
          </div>

          {/* SUBMIT BUTTON */}
          <div className="flex justify-center mt-10">
            <button
              type="submit"
              disabled={loading}
              className="px-10 py-3 bg-gradient-to-r from-teal-500 to-indigo-500 text-white font-bold rounded-xl shadow-md hover:scale-105 transition duration-300 disabled:opacity-50"
            >
              Add Student
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Addstudent;

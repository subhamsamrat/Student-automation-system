import React, { useEffect, useState } from "react";
import axios from "axios";
import { handleAxiosError } from "@/utils/handleAxiosError";
import toast from "react-hot-toast";
<<<<<<< HEAD
import { BACKEND_URI } from "@/config";
=======
>>>>>>> 6ad45bcb9dcd07d92a868b9b2c3c577d4a243b18

export default function Editstudent({ open, onClose, data }) {
  const [loading, setLoading] = useState(false);

  const [studentname, setStudentname] = useState("");
  const [dob, setDob] = useState("");
  const [image, setImage] = useState("");
  const [regno, setRegno] = useState("");
  const [parentname, setParentname] = useState("");
  const [parentphone, setParentphone] = useState("");
  const [city, setCity] = useState("");
  const [stateValue, setStateValue] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [department, setDepartment] = useState("");
  const [year, setYear] = useState("");

  useEffect(() => {
    if (!open || !data) return;

    setLoading(true);

    try {
      setStudentname(data.studentName || data.fullName || "");
      setDob(
        data.DOB
          ? typeof data.DOB === "string"
            ? data.DOB.substring(0, 10)
            : new Date(data.DOB).toISOString().substring(0, 10)
          : ""
      );
      setImage(data.image?.url || "");
      setRegno(data.rollNo || data.regno || "");
      setParentname(data.parentName || "");
      setParentphone(data.parentPhoneNo || "");
      setCity(data.city || "");
      setStateValue(data.state || "");
      setEmail(data.email || "");
      setPhone(data.phoneNo || "");
      setDepartment(data.department || "");
      setYear(data.year || "");

    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }, [open, data]);
 
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("studentName", studentname);
    formData.append("DOB", dob);
    formData.append("rollNo", regno);
    formData.append("parentName", parentname);
    formData.append("parentPhoneNo", parentphone);
    formData.append("city", city);
    formData.append("state", stateValue);
    formData.append("email", email);
    formData.append("phoneNo", phone);
    formData.append("department", department);
    formData.append("year", year);

    if (image instanceof File) {
      formData.append("image", image);
    }

    try {
      const response = await axios.put(
<<<<<<< HEAD
        `${BACKEND_URI}/api/v1/admin/updatestudent/${data._id}`,
=======
        `https://student-automation-system.onrender.com/api/v1/admin/updatestudent/${data._id}`,
>>>>>>> 6ad45bcb9dcd07d92a868b9b2c3c577d4a243b18
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      toast.success(response.data.message);
      onClose();

    } catch (error) {
      handleAxiosError(error);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-999 flex items-center justify-center p-4">

      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"
           onClick={onClose}></div>

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-4xl p-6 max-h-[90vh] overflow-y-auto">

        {/* Close */}
        <button
          className="absolute right-4 top-4 text-gray-600 hover:text-gray-900"
          onClick={onClose}
        >
          ✕
        </button>

        <h2 className="text-3xl font-bold text-center mb-6 text-indigo-600">
          Edit Student Details
        </h2>

        {loading ? (
          <p className="text-center">Loading...</p>
        ) : (
          <form className="space-y-10" onSubmit={handleSubmit}>

            {/* Student Info */}
            <div className="p-5 rounded-xl bg-gray-50 shadow">
              <h3 className="text-xl font-semibold mb-4">Student Information</h3>

              <div className="grid md:grid-cols-3 gap-6">
                <input
                  className="input input-bordered"
                  value={studentname}
                  onChange={(e) => setStudentname(e.target.value)}
                />

                <input
                  type="date"
                  className="input input-bordered"
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                />

                <input
                  type="file"
                  className="file-input file-input-bordered"
                  onChange={(e) => setImage(e.target.files[0])}
                />

                <input
                  className="input input-bordered col-span-3 md:col-span-1"
                  value={regno}
                  onChange={(e) => setRegno(e.target.value)}
                />
              </div>
            </div>

            {/* Parent Info */}
            <div className="p-5 rounded-xl bg-gray-50 shadow">
              <h3 className="text-xl font-semibold mb-4">Parent Information</h3>

              <div className="grid md:grid-cols-2 gap-6">
                <input
                  className="input input-bordered"
                  value={parentname}
                  onChange={(e) => setParentname(e.target.value)}
                />

                <input
                  className="input input-bordered"
                  value={parentphone}
                  onChange={(e) => setParentphone(e.target.value)}
                />
              </div>
            </div>

            {/* Address */}
            <div className="p-5 rounded-xl bg-gray-50 shadow">
              <h3 className="text-xl font-semibold mb-4">Address</h3>

              <div className="grid md:grid-cols-2 gap-6">
                <input
                  className="input input-bordered"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
                <input
                  className="input input-bordered"
                  value={stateValue}
                  onChange={(e) => setStateValue(e.target.value)}
                />
              </div>
            </div>

            {/* Contact */}
            <div className="p-5 rounded-xl bg-gray-50 shadow">
              <h3 className="text-xl font-semibold mb-4">Contact</h3>

              <div className="grid md:grid-cols-2 gap-6">
                <input
                  className="input input-bordered"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <input
                  className="input input-bordered"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
            </div>

            {/* Department */}
            <div className="p-5 rounded-xl bg-gray-50 shadow">
              <h3 className="text-xl font-semibold mb-4">Department</h3>

              <div className="grid md:grid-cols-2 gap-6">
                <select
                  className="input input-bordered"
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                >
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
                  className="input input-bordered"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                >
                  <option>1st yr</option>
                  <option>2nd yr</option>
                  <option>3rd yr</option>
                  <option>4th yr</option>
                </select>
              </div>
            </div>

            <div className="flex justify-center">
              <button className="px-10 py-3 bg-indigo-600 text-white rounded-xl hover:scale-105 transition">
                Update
              </button>
            </div>

          </form>
        )}
      </div>
    </div>
  );
}

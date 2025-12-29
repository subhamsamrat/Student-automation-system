<<<<<<< HEAD
import { BACKEND_URI } from "@/config";
=======
>>>>>>> 6ad45bcb9dcd07d92a868b9b2c3c577d4a243b18
import { handleAxiosError } from "@/utils/handleAxiosError";
import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

function DltStdModal({ data, open }) {
  const [value, setValue] = useState("");

  const deleteKey =typeof data === "string" ? data : data?.student || "";

  useEffect(() => {
    if (open) {
      document.getElementById("DltStdModal").showModal();
    }
  }, [open]);

  const handleDelete = async() => {
    try {
      if (value.trim() === deleteKey) {
         
         const response = await axios.delete(
<<<<<<< HEAD
        `${BACKEND_URI}/api/v1/admin/deletestudent/${data.stdId}`,
=======
        `https://student-automation-system.onrender.com/api/v1/admin/deletestudent/${data.stdId}`,
>>>>>>> 6ad45bcb9dcd07d92a868b9b2c3c577d4a243b18
        {
          withCredentials: true,
        }
      );
      toast.success(response.data.message);
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } else {
      toast.error("Please type the correct keyword");
    }

    } catch (error) {
      handleAxiosError(error)
    }
  };

  return (
    <dialog id="DltStdModal" className="modal">
      <div className="modal-box max-w-sm sm:max-w-md md:max-w-lg bg-white rounded-2xl p-5 shadow-xl">

        <h3 className="font-bold text-xl text-gray-800 ">
          Are You Sure Want to Delete Student?
        </h3>

        <p className="py-3 text-sm text-gray-600 ">
          <span className="text-red-500 font-semibold">Note:</span> All records
          related to this student will be permanently deleted (Attendance, Exams,
          Payments).
        </p>

        <div className="text-center mt-4">
          <p className="text-sm text-gray-700">
            Type <span className="font-bold text-blue-600">{deleteKey}</span> to confirm Delete.
          </p>

          <input
            type="text"
            placeholder="Type here..."
            className="input input-bordered w-full mt-3 bg-gray-100"
            onChange={(e) => setValue(e.target.value)}
          />
        </div>

        <div className="modal-action flex justify-center mt-4">

          {value.trim() === deleteKey && (
            <button
              className="btn bg-red-500 text-white px-6 hover:bg-red-600 rounded-lg"
              onClick={handleDelete}
            >
              Delete
            </button>
          )}

        </div>
      </div>
    </dialog>
  );
}

export default DltStdModal;

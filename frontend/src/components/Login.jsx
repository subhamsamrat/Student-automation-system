import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import { handleAxiosError } from "@/utils/handleAxiosError";
import { BACKEND_URI } from "@/config";
import { Loading1 } from "@/utils/Loading";

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [selectedRole, setSelectedRole] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    if (!selectedRole) {
      toast.error("Please select a role");
      return;
    }

    try {
      setLoading(true);

      const endpoint =
        selectedRole === "student"
          ? "/api/v1/student/studentlogin"
          : "/api/v1/admin/adminlogin";

      const response = await axios.post(
        `${BACKEND_URI}${endpoint}`,
        data,
        { withCredentials: true }
      );

      // store user
      const userData =
        selectedRole === "student"
          ? response.data.user
          : response.data.existAdmin;

      localStorage.setItem(
        "user",
        JSON.stringify({ ...userData, role: selectedRole })
      );

      toast.success(response.data.message);

      document.getElementById("login_modal").close();

      setTimeout(() => {
        window.location.reload();
      }, 1000);

    } catch (error) {
      handleAxiosError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <dialog id="login_modal" className="modal">
        <div className="modal-box relative bg-gradient-to-r from-blue-600">

          {loading && (
            <div className="absolute overflow-hidden inset-0 bg-black/40 backdrop-blur-sm
                           flex items-center justify-center z-50 rounded-lg">
              <Loading1 />
            </div>
          )}

          {/* Close button */}
          <button
            disabled={loading}
            onClick={() => document.getElementById("login_modal").close()}
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          >
            ✕
          </button>

          <form onSubmit={handleSubmit(onSubmit)}>
            <h3 className="font-bold text-lg">Login</h3>

            {/* ---- Role Selection ---- */}
            <div className="flex pt-5 text-[15px]">
              <p>Admin</p>
              <input
                type="checkbox"
                checked={selectedRole === "admin"}
                onChange={() =>
                  setSelectedRole(selectedRole === "admin" ? "" : "admin")
                }
                className="h-4 w-4 mt-0.5 ml-2"
              />

              <p className="ml-5">Student</p>
              <input
                type="checkbox"
                checked={selectedRole === "student"}
                onChange={() =>
                  setSelectedRole(selectedRole === "student" ? "" : "student")
                }
                className="h-4 w-4 mt-0.5 ml-2"
              />
            </div>

            {/* ---- Inputs ---- */}
            <div className="flex flex-col mt-5">
              <p className="text-sm">Email</p>
              <input
                {...register("email", { required: true })}
                type="email"
                placeholder="Enter your email"
                className="h-10 bg-gray-100 rounded-md pl-2 text-sm"
              />
              {errors.email && (
                <span className="text-red-500 text-sm">
                  Email is required
                </span>
              )}

              <p className="text-sm mt-5">Password</p>
              <input
                {...register("password", { required: true })}
                type="password"
                placeholder="Enter password"
                className="h-10 bg-gray-100 rounded-md pl-2 text-sm"
              />
              {errors.password && (
                <span className="text-red-500 text-sm">
                  Password is required
                </span>
              )}
            </div>

            {/* ---- Buttons ---- */}
            <div className="flex justify-between mt-5">
              <button
                disabled={loading}
                className="bg-amber-500 h-10 px-6 rounded-md
                           active:scale-95 disabled:opacity-50"
              >
                Login
              </button>

              <Link to="/signup" className="text-sm text-gray-500">
                Not registered?{" "}
                <u className="text-blue-500">Signup</u>
              </Link>
            </div>
          </form>
        </div>
      </dialog>
    </>
  );
}

export default Login;

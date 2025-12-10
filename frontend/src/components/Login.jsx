import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from 'react-hot-toast';
import { handleAxiosError } from "@/utils/handleAxiosError";

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [selectedRole, setSelectedRole] = useState("");
  let response;
  const onSubmit = async (data) => {
    try {

      if (selectedRole === "student") {
        response = await axios.post(
          "https://student-automation-system.onrender.com/api/v1/student/studentlogin",
          data,
          {
            withCredentials: true,
            headers: { "content-type": "application/json" },
            credentials: "include",
          }
        );
      
      } else if (selectedRole === "admin") {
        response = await axios.post(
          "http://localhost:4000/api/v1/admin/adminlogin",
          data,
          {
            withCredentials: true,
            headers: { "content-type": "application/json" },
            credentials: "include",
          }
        );
        
      }
      if (selectedRole === "student") {
        if (response.data.user) {
          localStorage.setItem(
            "user",
            JSON.stringify({
              ...response.data.user,
              role: selectedRole,
            })
          );
        }
      } else if (selectedRole === "admin") {
        if (response.data.existAdmin) {
          localStorage.setItem(
            "user",
            JSON.stringify({
              ...response.data.existAdmin.email,
              role: selectedRole,
            })
          );
        }
      } else {
        toast.error("pleas select role !!");
      }

      toast.success(response.data.message);
      document.getElementById("login_modal").close();
      setTimeout(()=>{
         window.location.reload();
      },1000);
      
    } catch (error) {
      console.log("ERROR !! in login.jsx", error)
      handleAxiosError(error);
    }
  };

  return (
    <>
      <dialog id="login_modal" className="modal">
        <div className="modal-box bg-gradient-to-r from-blue-600">
          <button
            onClick={() => document.getElementById("login_modal").close()}
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          >
            ✕
          </button>

          <form method="dialog" onSubmit={handleSubmit(onSubmit)}>
            <h3 className="font-bold text-lg">Login</h3>

            {/* ---- Checkboxes ---- */}
            <div className="flex pt-5 text-[15px]">
              <p>Admin:-</p>
              <input
                {...register("checkbox", { required: true })}
                type="checkbox"
                checked={selectedRole === "admin"}
                onChange={() =>
                  setSelectedRole(selectedRole === "admin" ? "" : "admin")
                }
                className="h-4 w-4 mt-0.5 ml-2  "
              />

              <p className="ml-5">Student:-</p>
              <input
                {...register("checkbox", { required: true })}
                type="checkbox"
                checked={selectedRole === "student"}
                onChange={() =>
                  setSelectedRole(selectedRole === "student" ? "" : "student")
                }
                className="h-4 w-4 mt-0.5 ml-2"
              />
              {errors.checkbox && (
                <span className="text-red-500 text-sm ml-5">Select Role</span>
              )}
            </div>

            {/* ---- Email and Password Inputs ---- */}
            <div className="flex flex-col mt-5">
              <p className="text-sm">Email</p>
              <input
                {...register("email", { required: true })}
                type="email"
                placeholder="Enter your email"
                className="h-10 md:w-100 bg-gray-100 rounded-md pl-2 text-sm hover:bg-gray-200"
              />
              {errors.email && (
                <span className="text-red-500 text-sm">Email is required</span>
              )}

              <p className="text-sm mt-5">Password</p>
              <input
                {...register("password", { required: true })}
                type="password"
                placeholder="Enter Password"
                className="h-10 md:w-100 bg-gray-100 rounded-md pl-2 text-sm hover:bg-gray-200"
              />
              {errors.password && (
                <span className="text-red-500 text-sm">
                  Password is required
                </span>
              )}
            </div>

            {/* ---- Buttons ---- */}
            <div className="flex justify-between mt-5">
              <button className="bg-amber-500 h-10 w-18 rounded-md">
                Login
              </button>
              <Link to="/signup" className="text-sm text-gray-500">
                Not registered?{" "}
                <u className="text-sm text-blue-500 cursor-pointer">Signup</u>
              </Link>
            </div>
          </form>
        </div>
      </dialog>
    </>
  );
}

export default Login;

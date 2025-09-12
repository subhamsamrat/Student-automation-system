import React, { useEffect } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { useForm } from "react-hook-form"
import axios from 'axios'


function Login() {
    const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()

  const onSubmit = async(data)=>{
    try {
      const response=await axios.post("http://localhost:4000/api/v1/student/studentlogin",data, {
          withCredentials: true,
          headers: { "content-type": "application/json" }, credentials: 'include',
        } )
  
    if (response.data.user) {
      localStorage.setItem("user", JSON.stringify(response.data.user));
    }
       
    alert(response.data.message);
    document.getElementById('login_modal').close();
    <Navigate to='/'/>
    window.location.reload();
    } catch (error) {
      console.log('ERROR !! in login.jsx',error);
      alert(error.response.data.error || "something went wrong please try again later");
    }
  }


  return (
    <>
      <dialog id="login_modal" className="modal ">
    <div className="modal-box bg-gradient-to-r from-blue-600">
    
      <button 
        onClick={() => document.getElementById('login_modal').close()}
      className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
     <form method="dialog" onSubmit={handleSubmit(onSubmit)}>
    <h3 className="font-bold text-lg">Login</h3>
      <div className='flex flex-col mt-10 '>
        <p className='text-sm'>Email</p>
         <input
          {...register("email", { required: true })}
         type="email" placeholder='Enter your email' className='h-10 md:w-100 bg-gray-100 rounded-md pl-2 text-sm hover:bg-gray-200' />
               {errors.email && <span className='text-red-500 text-sm'>Email is required</span>}

         <p className='text-sm mt-5'>Password</p>
       <input
         {...register("password", { required: true })}
         type="password" placeholder='Enter Password' className='h-10 md:w-100 bg-gray-100 rounded-md pl-2 text-sm hover:bg-gray-200' />
               {errors.password && <span className='text-red-500 text-sm'>Password is required</span>}
      </div>
      <div className='flex justify-between mt-15'>
        <button className='bg-amber-500 h-10 w-18 rounded-md'>Login</button>
        <Link to='/signup' className='text-sm text-gray-500'>Not register <button
         
        ><u className='text-sm text-blue-500 cursor-pointer'>Signup</u></button></Link>
      </div>
      </form>
  </div>
</dialog>
    </>
  )
}

export default Login

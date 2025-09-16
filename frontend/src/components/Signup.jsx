import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import Login from './Login';
import axios from 'axios';


function Signup() {
     
  const navigate=useNavigate();
          const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()

  const onSubmit =async(data)=>{
    
    try {
       const response=await axios.post('http://localhost:4000/api/v1/student/studentsignup',data);
       console.log('signup successfull');
       alert(response.data.message);
      navigate('/');
    } catch (error) {

      console.log('ERROR !! in signup.jsx',error);
      alert(error.response.data.error || "something went wrong please try again later");     
    } 
             
    
  }



  return (
    <>
       <div className='flex justify-center items-center h-screen w-screen'>
        <div className='  shadow-2xl box-content rounded-md bg-gradient-to-r from-blue-500 p-5'>
             <div className='flex justify-between items-center rounded-t-md'>
                <h1 className='text-xl font-bold '>Signup</h1>
                <Link to='/' className=" btn rounded-full h-5 w-5">✕</Link>
             </div>

              <form method="dialog" onSubmit={handleSubmit(onSubmit)}>
                
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
                            
                        <p className='text-sm mt-5'>Confirm Password</p>
                            <input
                      {...register("confirmPassword", { required: true })}
                      type="password" placeholder='Enter Password' className='h-10 md:w-100 bg-gray-100 rounded-md pl-2 text-sm hover:bg-gray-200' />
                            {errors.confirmPassword && <span className='text-red-500 text-sm'>Confirm Password is required</span>}
                   </div>
                   <div className='flex justify-between mt-15'>
                     <button className='bg-amber-500 h-10 md:w-18 w-20  rounded-md'>Signup</button>
              <div className="md:ml-50 text-sm text-gray-500">
              Have an Account?
            <a
                  className="underline text-blue-600 cursor-pointer"
                  onClick={() =>
                    document.getElementById("login_modal").showModal()
                  }
                >
                  Login
                </a>  
               
            </div>
                   </div>
                   </form>
                    <Login/>
        </div>
       </div>
    </>
  )
}

export default Signup

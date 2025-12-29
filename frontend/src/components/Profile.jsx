 import React, { useContext } from 'react'
 import { authContext } from '../context/AuthContext.jsx'

 function Profile() {
  
const user=useContext(authContext);
  const date =new Date(user.DOB);
  
   return (
    <>
          <dialog id="profile_modal" className="modal">
<div className='absolute right-0'>
      <button
        onClick={() => document.getElementById('profile_modal').close()}
      className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
       <div className="menu bg-base-200 text-base-content md:min-h-full md:w-[30vw] p-3 ">
      {/* Sidebar content here */}
      <div className='flex md:flex-row flex-col items-center gap-5 bg-gradient-to-t to-blue-700 p-3 rounded-lg shadow-xl'>
        <img src={user.image.url} alt="" className='md:h-35 md:w-35 h-60 w-50 rounded-full object-cover shadow-2xl'/>
        <h2 className="text-2xl font-bold">{user.studentName} </h2>
      </div>
      <section className=''>
        <h3 className='mt-3 text-xl text-blue-600 underline'>Academic Details</h3>
        <div className='mt-0.5 '>
          <p className='hover:bg-gray-200 py-1 px-1'><span className='font-semibold '>Department :-</span>{user.department}</p>
          <p className='mt-2 hover:bg-gray-200 py-0.5 px-1'><span className='font-semibold '>Year :-</span>{user.year}</p>
          <p className='mt-2 hover:bg-gray-200 py-0.5 px-1'><span className='font-semibold '>Roll No :-</span>{user.rollNo}</p>
          
        </div>
      </section>
      <section>
        <h3 className='mt-3 text-xl text-blue-600 underline'>Personal Details</h3>
        <div className='mt-0.5'>
          <p className='hover:bg-gray-200 py-1 px-1'><span  className='font-semibold'>Email :-</span>{user.email}</p>
          <p className='mt-2 hover:bg-gray-200 py-0.5 px-1'><span  className='font-semibold'>Father Name :-</span>{user.parentName}</p>
          <p className='mt-2 hover:bg-gray-200 py-0.5 px-1'><span className='font-semibold'>Phone :-</span>{user.phoneNo}</p>
          <p className='mt-2 hover:bg-gray-200 py-0.5 px-1'><span className='font-semibold'>Parent Phone :-</span>{user.parentPhoneNo}</p>
          <p className='mt-2 hover:bg-gray-200 py-0.5 px-1'><span className='font-semibold'>Date of Birth :-</span>{date.toLocaleDateString()}</p>
          <p className='mt-2 hover:bg-gray-200 py-0.5 px-1'><span className='font-semibold'>Gender :-</span>{user.gender}</p>
           <p className='mt-2 hover:bg-gray-200 py-0.5 px-1'><span className='font-semibold'>state :-</span>{user.state}</p>
          <p className='mt-2 hover:bg-gray-200 py-0.5 px-1'><span className='font-semibold'>city :-</span>{user.city}</p>
        </div>
      </section>
      <button 
      onClick={()=>{
        localStorage.removeItem("user");
        window.location.reload();
      }}
      className='mt-5 btn bg-black text-white'>Logout</button>
    </div>
      
</div>
 
</dialog>   
    </>
   )
 }
 
 export default Profile;
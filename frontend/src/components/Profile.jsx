 import React from 'react'
 
 function Profile() {
   return (
     <div>
      <div className="drawer drawer-end ">
  <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
  <div className="drawer-content">
    {/* Page content here */}
    <label htmlFor="my-drawer-4" className="drawer-button btn btn-primary">Open drawer</label>
  </div>
  <div className="drawer-side ">
    <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
    <div className="menu bg-base-200 text-base-content min-h-full w-[30vw] p-3 ">
      {/* Sidebar content here */}
      <div className='flex items-center gap-5 bg-gradient-to-t to-blue-700 p-3 rounded-lg shadow-xl'>
        <img src="https://t3.ftcdn.net/jpg/13/65/98/42/240_F_1365984265_rRMWjvrYwOTK1pIpsQdbXQhykUJgqQqR.jpg" alt="" className='h-35 w-35  rounded-full object-cover shadow-2xl'/>
        <h2 className="text-2xl font-bold">Subham </h2>
      </div>
      <section className=''>
        <h3 className='mt-3 text-xl text-blue-600 underline'>Academic Details</h3>
        <div className='mt-1 '>
          <p className='hover:bg-gray-200 py-1 px-1'><span className='font-semibold '>Department :-</span> Bca</p>
          <p className='mt-2 hover:bg-gray-200 py-1 px-1'><span className='font-semibold '>Reg No :-</span> 123456</p>
          <p className='mt-2 hover:bg-gray-200 py-1 px-1'><span className='font-semibold'>Roll No :-</span> 23</p>
          <p className='mt-2 hover:bg-gray-200 py-1 px-1'><span className='font-semibold'>Address :-</span> 123 Main St, City, Country</p>
        </div>
      </section>
      <section>
        <h3 className='mt-3 text-xl text-blue-600 underline'>Personal Details</h3>
        <div className='mt-1'>
          <p className='hover:bg-gray-200 py-1 px-1'><span  className='font-semibold'>Email :-</span> subham@example.com</p>
          <p className='mt-2 hover:bg-gray-200 py-1 px-1'><span  className='font-semibold'>Father Name :-</span> Mr. Subham</p>
          <p className='mt-2 hover:bg-gray-200 py-1 px-1'><span className='font-semibold'>Phone :-</span> +1234567890</p>
          <p className='mt-2 hover:bg-gray-200 py-1 px-1'><span className='font-semibold'>Parent Phone :-</span> +1234567890</p>
          <p className='mt-2 hover:bg-gray-200 py-1 px-1'><span className='font-semibold'>Date of Birth :-</span> 01/01/2000</p>
          <p className='mt-2 hover:bg-gray-200 py-1 px-1'><span className='font-semibold'>Gender :-</span> Male</p>

        </div>
      </section>
      <button className='mt-5 btn bg-black text-white'>Logout</button>
    </div>
  </div>
</div>
</div>
   )
 }
 
 export default Profile
 
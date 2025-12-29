import React from 'react'

function Bnr3_modal1() {
    
  return (
   <>
   <div>
    {/* Open the modal using document.getElementById('ID').showModal() method */}
{/* <button className="btn" onClick={()=>document.getElementById('my_modal_1').showModal()}>open modal</button> */}
<dialog id="my_modal_1" className="modal  ">
  <div className="modal-box">
    <img className='rounded-lg' src="https://images.pexels.com/photos/8423046/pexels-photo-8423046.jpeg" alt="" />
    <h3 className="font-bold text-lg">Attendance management system</h3>
    <p className="py-4 text-sm">Revolutionize your student attendance tracking with our Student Attendance System. Our system provides a comprehensive platform for tracking and analyzing student attendance, with features such as real-time alerts, and customizable reports. With this module, you can improve attendance accuracy, save time, and enhance overall student engagement.</p>
    <div className="modal-action">
      <form method="dialog">
        {/* if there is a button in form, it will close the modal */}
      <button className="btn btn-dash btn-error">Close</button>
      </form>
    </div>
  </div>
</dialog>
   </div>
   </>
  )
}

function Bnr3_modal2() {

  return (
   <>
   <div>
    {/* Open the modal using document.getElementById('ID').showModal() method */}
{/* <button className="btn" onClick={()=>document.getElementById('my_modal_1').showModal()}>open modal</button> */}
<dialog id="my_modal_2" className="modal ">
  <div className="modal-box  ">
    <img className='rounded-md' src="https://plus.unsplash.com/premium_photo-1705908008771-1dcebcc4d866?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDl8fGV4YW0lMjBtYW5hZ2VtZW50fGVufDB8fDB8fHww" alt="" />
    <h3 className="font-bold text-lg">Exam Management System</h3>
    <p className="py-4 text-sm ">Revolutionizing your assessment process with our comprehensive exam management platform. Our module offers a secure, flexible, and efficient way to exam section. With advanced features such as question banks, automated grading and detailed analytics, streamline your assessment process and improve student performance.

</p>
    <div className="modal-action">
      <form method="dialog">
        {/* if there is a button in form, it will close the modal */}
      <button className="btn btn-dash btn-error">Close</button>
      </form>
    </div>
  </div>
</dialog>
   </div>
   </>
  )
}

function Bnr3_modal3() {

  return (
   <>
   <div>
    {/* Open the modal using document.getElementById('ID').showModal() method */}
{/* <button className="btn" onClick={()=>document.getElementById('my_modal_1').showModal()}>open modal</button> */}
<dialog id="my_modal_3" className="modal">
  <div className="modal-box">
    <img src="https://images.unsplash.com/photo-1667566455648-262db767912b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGZlZXMlMjBtYW5hZ2VtZW50fGVufDB8fDB8fHww" alt="" />
    <h3 className="font-bold text-lg">Fees Management System</h3>
    <p className="py-4 text-sm">Simplify your financial operations with our Fee Collection System. Our system enables you to collect, manage, and track fees seamlessly, automated reminders, and real-time reporting. With our Fees Collection System, you can streamline your fee collection process, minimize errors, and ensure timely payments, making it easier for you to focus on what matters most: educating students.</p>
    <div className="modal-action">
      <form method="dialog">
        {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-dash btn-error">Close</button>
      </form>
    </div>
  </div>
</dialog>
   </div>
   </>
  )
}

function Bnr3_modal4() {

  return (
   <>
   <div>
    {/* Open the modal using document.getElementById('ID').showModal() method */}
{/* <button className="btn" onClick={()=>document.getElementById('my_modal_1').showModal()}>open modal</button> */}
<dialog id="my_modal_4" className="modal">
  <div className="modal-box">
    <img src="https://media.istockphoto.com/id/1666779408/photo/happy-excited-beautiful-indian-young-couple-move-the-box-into-the-home-at-new-home-relocation.jpg?s=1024x1024&w=is&k=20&c=o6wXm1KQpM5Ne_un-XCMn-M56UuvI0GYsCPy9J8NFw0=" alt="" />
    <h3 className="font-bold text-lg">Upcomming Models?</h3>
    <p className="py-4 text-sm ">Our upcomming modules are <span className='font-bold'>Library management system,and next faculty section</span></p>
    <div className="modal-action">
      <form method="dialog">
        {/* if there is a button in form, it will close the modal */}
           <button className="btn btn-dash btn-error">Close</button>
      </form>
    </div>
  </div>
</dialog>
   </div>
   </>
  )
}

export  {Bnr3_modal1,Bnr3_modal2,Bnr3_modal3,Bnr3_modal4}

import { useState,useContext } from 'react'
import Home from './components/home/home'
import { Navigate, Route, Routes } from 'react-router-dom'
import Signup from './components/Signup'
import Login from './components/Login'
import Profile from './components/Profile'
import Result from './components/Restlt/Result'
import Account from './components/account/Account'
import TakeAttendance from './components/attendance/TakeAttendance'
import { authContext } from './context/AuthContext'
import Attendance from './components/attendance/Attendance.jsx'
import AddResult from './components/Restlt/AddResult'

//+++++++++++++++++++++++++admin++++++++++++++++++++++++++

//import Navbar from './components/Navbar'
// import Addstudent from './components/student/Addstudent';
// import Viewstudent from './components/student/Viewstudent';
// import Admin_Studentlist from './components/student/Admin_Studentlist';
//  import Editstudent from './components/student/Editstudent';
// import Payfees from './components/studentfees/Payfees';
// import Feeshistory from './components/studentfees/Feeshistory';
// import Admin_AttendanceReport from './components/attendance/Admin_attendanceReport';
// import Admin_Attendance from './components/attendance/Admin_attendance';
// import Addresult from './components/result/Addresult';
// import Viewresult from './components/result/Viewresult';

function App() {
  const [count, setCount] = useState(0)
const user=useContext(authContext);
   // console.log(useContext(authContext));
   function openLogin(){
    
    // const modal=document.getElementById("login_modal");
    
    //  if(modal) modal.showModal();
    alert('Pleas login first');
    
   }
   // console.log(user);
    
  return (
    <>
                 
       <Routes>
         <Route path='/' element={ <Home/> }/>
        <Route path='/attendance' element={<Attendance/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/result' element={ user?<Result/>:<Navigate to='/signup'/>}/>
        <Route path='/account' element={<Account/>}/>
        <Route path='/take' element={<TakeAttendance/>}/> 
        <Route path='/addresult' element={<AddResult/>}/> 

        {/* ++++++++++++++admin++++++++++++++++++ */}

         {/* <Route path="/Admin_addStudent" element={<Addstudent/>} />
        <Route path="/Admin_viewstudent/:id" element={<Viewstudent/>} />
        <Route path="/Admin_studentlist" element={<Admin_Studentlist/>} />
        <Route path='/editstudent/:id' element={<Editstudent/>} /> */}
        {/* <Route path="/payfees" element={<Payfees/>} /> */}
        {/* <Route path="/feeshistory/:id" element={<Feeshistory/>} /> */}
        {/* <Route path="/admin_attendance" element={<Admin_Attendance/>} />
        <Route path="/attendance-report" element={<Admin_AttendanceReport/>} /> */}
        {/* <Route path="/addresult" element={<Addresult/>} />
        <Route path="/viewresult" element={<Viewresult/>} /> */}
       </Routes>

        { /* <Login/>   user?<Account/>:<Navigate to='/signup'/>*/}

    </>
    
  )
}

export default App

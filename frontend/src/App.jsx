import { useState,useContext } from 'react'
import Home from './components/home/Home.jsx'
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
import ViewResult from './components/Restlt/ViewResult'
import ViewAttendance from './components/attendance/ViewAttendance'
import Admin_acc from './components/account/Admin_acc'
import Viewstudent from './components/student/Viewstudent'
import Addstudent from './components/student/Addstudent'



function App() {

const user=useContext(authContext);
    
  return (
    <>
                 
       <Routes>
         <Route path='/' element={ <Home/> }/>
        <Route path='/attendance' element={user?<Attendance/>:<Navigate to='/signup'/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/profile' element={user?<Profile/>:<Navigate to='/signup'/>}/>
        <Route path='/result' element={ user?<Result/>:<Navigate to='/signup'/>}/>
        <Route path='/account' element={user?<Account/>:<Navigate to='/signup'/>}/>
    
        {/* ++++++++++++++admin++++++++++++++++++ */}
    <Route path='/takeattendance' element={user?<TakeAttendance/>:<Navigate to='/signup'/>}/> 
    <Route path='/viewattendance' element={user?<ViewAttendance/>:<Navigate to='/signup'/>}/> 
        <Route path='/addresult' element={user?<AddResult/>:<Navigate to='/signup'/>}/> 
        <Route path='/viewresult' element={user?<ViewResult/>:<Navigate to='/signup'/>}/> 
        <Route path='/payment' element={user?<Admin_acc/>:<Navigate to='/signup'/>}/> 
        <Route path='/viewstudent' element={user?<Viewstudent/>:<Navigate to='/signup'/>}/> 
        <Route path='/addstudent' element={user?<Addstudent/>:<Navigate to='/signup'/>}/> 
       
       </Routes>

     

    </>
    
  )
}

export default App

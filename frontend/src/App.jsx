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
import ViewResult from './components/Restlt/ViewResult'
import ViewAttendance from './components/attendance/ViewAttendance'

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
    
        {/* ++++++++++++++admin++++++++++++++++++ */}
    <Route path='/takeattendance' element={<TakeAttendance/>}/> 
    <Route path='/viewattendance' element={<ViewAttendance/>}/> 
        <Route path='/addresult' element={<AddResult/>}/> 
        <Route path='/viewresult' element={<ViewResult/>}/> 
       
       </Routes>

        { /* <Login/>   user?<Account/>:<Navigate to='/signup'/>*/}

    </>
    
  )
}

export default App

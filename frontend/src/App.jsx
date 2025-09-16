import { useState,useContext } from 'react'
import Home from './components/home/home'
import Attendance from './components/attendance/Attendance'
import { Navigate, Route, Routes } from 'react-router-dom'
import Signup from './components/Signup'
import Login from './components/Login'
import Profile from './components/Profile'
import Result from './components/Restlt/Result'
import Account from './components/account/Account'
import TakeAttendance from './components/attendance/TakeAttendance'
import { authContext } from './context/AuthContext'

function App() {
  const [count, setCount] = useState(0)
const user=useContext(authContext);
   // console.log(useContext(authContext));
   function openLogin(){
    
    // const modal=document.getElementById("login_modal");
    
    //  if(modal) modal.showModal();
    alert('Pleas login first');
    
   }
    
  return (
    <>
       

       <Routes>
        <Route path='/' element={ <Home/>   }/>
        <Route path='/attendance' element={ user?<Attendance/>:<Navigate to='/signup'/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/result' element={ user?<Result/>:<Navigate to='/signup'/>}/>
        <Route path='/account' element={ user?<Account/>:<Navigate to='/signup'/>}/>
        <Route path='/take' element={<TakeAttendance/>}/>
       </Routes>
       
        {/* <Login/> */}
       
    </>
    
  )
}

export default App

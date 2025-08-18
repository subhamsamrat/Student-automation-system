import { useState } from 'react'
import Home from './components/home/home'
import Attendance from './components/attendance/Attendance'
import { Route, Routes } from 'react-router-dom'
import Signup from './components/Signup'
import Login from './components/Login'
import Profile from './components/Profile'
import Result from './components/Restlt/Result'
import Account from './components/account/Account'
import TakeAttendance from './components/attendance/TakeAttendance'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
       

       <Routes>
        <Route path='/' element={ <Home/>   }/>
        <Route path='/attendance' element={<Attendance/>}/>
        <Route path='/signup' element={<Signup/>}/>
        {/* <Route path='/login' element={<Login/>}/> */}
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/result' element={<Result/>}/>
        <Route path='/account' element={<Account/>}/>
        <Route path='/take' element={<TakeAttendance/>}/>
       </Routes>
    </>
  )
}

export default App

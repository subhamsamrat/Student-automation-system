import React, { useEffect, useState } from 'react'
import LeftsideInfo from './LeftsideInfo'
import RightsideInfo from './RightsideInfo'
import { useParams } from 'react-router-dom'
import studentinfo from "../../assets/studentinfo.json"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'


function Viewstudent() {
  //{id, onClose}
  const {id} = useParams()
  const [loading, setLoading] = useState("")
  const [students, setStudents] = useState("")

  console.log("std id=",typeof(id));
  
 
  useEffect(() => {
    const fetchStudents = () => {
      setLoading(true)
      try {
        const responnse = studentinfo;
        //const std=responnse.map((e)=>{e.rollNo===id?e:'user not found'})
        const std=responnse.find((e)=>{return e.rollNo===id})
        setStudents(std)
        
      } catch (error) {
         if(!responnse){
              alert(error)
            }
      }
      finally{
              setLoading(false)
            }
    }
    fetchStudents()
  },[])

  return (
    <>
   {
     loading ? (
      <p>Loading.....</p>
    ) : (
   <div className=' z-1 inset-0 fixed  backdrop-opacity-100 backdrop-blur-lg flex justify-center items-center '>
      <div className='md:px-10 h-screen bg-gradient-to-b from-white to-green-100 flex md:flex-row flex-col w-[80%]'>
        {/* <button 
        onClick={onClose}
        className='fixed mt-14 cursor-pointer px-1 py-[1px] md:mt-18 text-xl font-extrabold text-black rounded-full 
         hover:text-blue-700'>
          <FontAwesomeIcon icon={faArrowLeft} /></button> */}
        <LeftsideInfo students={students} />
        <RightsideInfo students={students} />
      </div>
   </div>
    )
   }
    </>
  )
}

export default Viewstudent

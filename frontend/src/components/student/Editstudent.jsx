import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import studentinfo from "../../assets/studentInfo.json"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'

function Editstudent({id, onClose}) {
      
  //const {id} = useParams()
  const [loading, setLoading] = useState("")
  const [students, setStudents] = useState("")
  
  const [studentname, setStudentname] = useState("")
  const [dob, setDob] = useState("")
  const [image, setImage] = useState("") // Assuming you will handle image upload separately
  const [regno, setRegno] = useState("")
  const [parentname, setParentname] = useState("")
  const [parentphone, setParentphone] = useState("")
  const [city, setCity] = useState("")
  const [state, setState] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [department, setDepartment] = useState("")
  const [year, setYear] = useState("")


  useEffect(() => {
    const fetchStudents = () => {
      setLoading(true)
      try {
        
        const responnse = studentinfo;
       
        
        if(responnse){
          const std=responnse.find(student => {return student.rollNo == id})
           console.log("std=",std);
          setStudents(std)
          setStudentname(std.fullName); 
          setDob(std.dob); 
          setImage(std.photo);
          setRegno(std.rollNo);
          setParentname(std.parentName);
          setParentphone(std.parentPhoneNumber);
          setCity(std.city);
          setState(std.state);
          setEmail(std.email);
          setPhone(std.phoneNumber);
          setDepartment(std.department);
          setYear(std.year);
        }
      } catch (error) {
        //  if(!responnse){
        //       alert(error)
        //     }
        console.log("ERROR !! in edit student:",error);
      }
      finally{
              setLoading(false)
            }
    }
    fetchStudents()
  },[])

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const studentData = {
      studentname,
      dob,
      image, // Note: You might need to handle image upload separately
      regno,
      parentname,
      parentphone,
      city,
      state,
      email,
      phone,
      department,
      year,
    }
    studentData && console.log("Student Data Submitted: ", studentData);
    studentData && alert("Student Data updatted");
    setStudentname("");
    setDob(""); 
    setImage("");
    setRegno("");
    setParentname("");
    setParentphone("");
    setCity("");
    setState("");
    setEmail("");
    setPhone("");
    setDepartment("");
    setYear("");
  }

  return (
    <div className='z-1 inset-0 fixed  backdrop-opacity-100 backdrop-blur-lg flex justify-center items-center '>

  <div className='h-full md:pt-3 py-5 bg-blue-50 w-[75%]'>
         
     {
     loading ? (
      <p>Loading.....</p>
    ) : (
       <form 
  onSubmit={(e)=> {
    handleSubmit(e);
  }} 
  className=' px-5 md:px-10 bg-gradient-to-b from-amber-50 to-teal-100 h-full shadow-lg rounded-lg mt-7 md:mt-13 overflow-y-scroll'>

    <div className='flex justify-center items-center'>
     <div>
          <button 
        onClick={onClose}
        className=' cursor-pointer text-xl font-extrabold text-black rounded-full 
         hover:text-blue-700'>
          <FontAwesomeIcon icon={faArrowLeft} /></button>
    </div>
     <div className='text-center w-full'>
           <h3 className='text-xl md:text-2xl font-semibold md:font-medium pt-1 md:pt-3'>Edit Student Information</h3>
     </div>
    </div>

    <h1 className='mt-2 md:mt-6 text-lg md:text-lg'>Student Information</h1>

    <div className='flex md:flex-row flex-col justify-between mt-2 w-full'>
      <input type="text" placeholder='Full Name' 
      required
      value={studentname}
      onChange={(e) => setStudentname(e.target.value)}
      className='bg-gray-50 w-full md:w-1/3 py-1 px-4 rounded-md mr-3 md:mt-2 md:mb-0 mb-3 '/>
      <input type="date" placeholder='Date of Birth' 
      required
      value={dob}
      onChange={(e) => setDob(e.target.value)}
      className='bg-gray-50 w-full md:w-1/3 py-1 px-4 rounded-md mr-3 md:mt-2 md:ml-3 md:mb-0 mb-3'/>
      <input type="file" placeholder='image' 
      required
      accept='image/*'
      onChange={(e) => setImage(e.target.files[0])}
      className="file-input file-input-accent bg-gray-50 md:mx-3 mb-3  md:mt-2 md:mb-0 p-1 md:p-0" />
      <input type="text" placeholder='Registration No.' 
      required
      value={regno}
      onChange={(e) => setRegno(e.target.value)}
      className='bg-gray-50 w-full md:w-1/3 py-1 px-4 rounded-md mr-3 md:mt-2 md:ml-3 md:mb-0 '/>
    </div>

    <h1 className='mt-3 md:mt-7 text-lg md:text-lg'>Parent Information</h1>

    <div className='flex justify-between w-full'>
      <input type="text" placeholder='Father/Mother Name' 
      required
      value={parentname}
      onChange={(e) => setParentname(e.target.value)}
      className='bg-gray-50 w-1/2 py-1 px-4 rounded-md mt-1 md:mt-2 mr-3 '/>
      <input type="number" placeholder='Parent Phone Number' 
      minLength={10} 
      required
      value={parentphone}
      onChange={(e) => setParentphone(e.target.value)}
      className='bg-gray-50 w-1/2 py-1 px-4 rounded-md mt-1 md:mt-2 md:ml-3'/>
    </div>
    
    <h1 className='mt-3 md:mt-7 text-lg md:text-lg'>Address</h1>

    <div className='flex md:flex-row flex-col justify-between mt-2 w-full'>
      <input type="text" placeholder='City' 
      required
      value={city}
      onChange={(e) => setCity(e.target.value)}
      className='bg-gray-50 w-full md:w-1/2 py-1 px-4 rounded-md mb-3 md:mt-2 mr-3'/>
      <input type="text" placeholder='State' 
      required
      value={state}
      onChange={(e) => setState(e.target.value)}
      className='bg-gray-50 w-full md:w-1/2 py-1 px-4 rounded-md  md:mt-2 md:ml-3'/>
    </div>

    <h1 className='mt-3 md:mt-7 text-lg md:text-lg'>Contact Information</h1>

    <div className='flex justify-between w-full'>
      <input type="email" placeholder='Email' 
      minLength={10}
      required
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      className='bg-gray-50 w-1/2 py-1 px-4 rounded-md mt-2  mr-3 '/>
      <input type="number" placeholder='Phone Number' 
      required
      value={phone}
      onChange={(e) => setPhone(e.target.value)}
      className='bg-gray-50 w-1/2 py-1 px-4 rounded-md mt-2  ml-3'/>
    </div>

    <h1 className='mt-3 md:mt-7 text-lg md:text-lg'>Department Information</h1>

     <div className='flex md:flex-row flex-col justify-between w-full pb-3'>

    <div className='w-full md:w-1/5'>
      <div className='flex mb-1 '>
      <label htmlFor="department" className='flex pt-2 md:pt-3'>Department</label>
      <select name="department" id='department'
        required
       value={department}
        onChange={(e) => setDepartment(e.target.value)} 
       className='bg-gray-50 w-full mt-2 md:mt-2 py-1 px-4 rounded-md ml-3 '>
        <option value={""}>Department</option>
        <option>BCA</option>
        <option>BBA</option>
        <option>BBT</option>
        <option value="BTECH">BTECH</option>
      </select>
    </div>

    <div className='flex '>
      <label htmlFor="Year" className='flex pt-2 md:pt-3'>Year</label>
      <select name="Year" id='Year' 
      required
      value={year}
      onChange={(e) => setYear(e.target.value)}
      className='bg-gray-50 w-full mt-2 md:mt-2 py-1 px-4 rounded-md ml-8 '>
        <option value={""}>Year</option>
        <option value={1}>1st Year</option>
        <option value={2}>2st Year</option>
        <option value={3}>3st Year</option>
        {department === "BTECH" && (
          <option value={4}>4th Year</option>
        )}
      </select>
    </div>

   </div>

     <div className='flex justify-center items-end mt-5 md:ml-3 w-full md:w-[15%]'>
      <button className='border px-4 py-1.5 rounded-lg cursor-pointer bg-teal-600 text-white text-lg font-semibold md:font-bold w-full mb-2' >Edit Student</button>
    </div>

     </div>
     
  </form>
    )
   }

  </div>

   </div>
  )
}

export default Editstudent


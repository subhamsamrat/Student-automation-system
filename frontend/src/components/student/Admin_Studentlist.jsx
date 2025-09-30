import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import DataTable from 'react-data-table-component'
import { colomns, StdActionBtns } from './StdDataTable'
import Selectdepartment from './Selectdepartment'
import studentinfo from "../../assets/studentInfo.json"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'

const Admin_Studentlist = () => {
      const [students, setStudents] = useState([])
      const [alldata, setAlldata] = useState([])
      const [loading, setLoading] = useState(false)
      const [filteredStudent, setFilteredStudent] = useState([]);
      const [formData, setFormData] = useState({
        department: "",
        year: ""
      });

      const listref = React.useRef("");

      const showList = (departmentRef) => {
        if(listref.current.classList.contains("hidden")&&
           !departmentRef.current.classList.contains("hidden"))
        {
          listref.current.classList.remove("hidden");
          departmentRef.current.classList.add("hidden");
        }
        // else if(!listref.current.classList.contains("hidden")&&
        //         departmentRef.current.classList.contains("hidden"))
        // {
        //   listref.current.classList.add("hidden");
        //  departmentRef.current.classList.remove("hidden");
        // }
      };

      const hideList = () => {
        window.location.reload();
      }


      useEffect(() => {
        const fetchStudents = () => {
          setLoading(true)
          try {
            const responnse = studentinfo;
            setAlldata(responnse)
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

      const filterstudent = (formdata) => {
               const filteredStudent = alldata.filter(std => (std.department == formdata.department)&&(std.year == (formdata.year?formdata.year:std.year)))  
           if(filteredStudent){
              const data = filteredStudent.map((std) => ({
                name: <div className='flex flex-col py-3 md:py-0'><div className='font-semibold text-[15px] md:font-normal md:text-[13.5px]'>{std.fullName}</div><div className='md:hidden block'>Roll No. - {std.rollNo}</div></div>,
                //std: <div className='text-black '><div>{std.fullName}</div><div>{std.rollNo}</div></div>,
                Image : <img className='h-10 w-10 rounded-full' src={std.photo} alt="file not found" />,
                Department: std.department,
                // Year: std.year,
                Roll_No: std.rollNo,
                Action: (<StdActionBtns Id={std.rollNo} />) 
              }))
              setStudents(data)
              //setFilteredStudentDep(data)
            }
          }

       const handleChange = (e) => {
          //e.preventDefault();
          const {name,value} = e.target;
          const formdata = {
            ...formData,
            [name]: value
          };
          setFormData(formdata);
           filterstudent(formdata);
           //console.log(formdata);

         }

      const handleFilter = (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const filteredData = students.filter(student => 
            student.Roll_No.toLowerCase().includes(searchTerm)
        );
        setFilteredStudent(filteredData);
      };

  return (
   <div >
    {
      loading?(
        <p>Loading....</p>
      ):(
        <div className=' flex w-full  h-screen '>

    <Selectdepartment onChange={handleChange} showList={showList} />

    <div className='w-full lg:w-[80%] p-2 md:p-5 mt-13  overflow-y-scroll lg:block hidden' ref={listref}>

   <div className='sticky top-0 z-1 bg-blue-50 py-3'>
    <div className='flex lg:flex-none'>
      <div  
      onClick={hideList}
      className='lg:hidden text-xl font-extrabold text-blue-700 rounded-full'>
        <FontAwesomeIcon icon={faArrowLeft} />
      </div>
   <div className='text-center w-full'>
    <h3 className='text-xl font-bold'>Manage Student</h3>
   </div>
   </div>

   <div className='flex justify-between mt-5 lg:mt-2 items-center'>
    <input type="text" placeholder='Search By Roll_No' 
    onChange= {handleFilter}
    className='px-4 py-1 rounded text-sm md:text-[17px] md:border-none border border-gray-300 bg-white'/>
    <Link to={"/Admin_addStudent"} className='px-4 py-1 bg-gradient-to-br from-[#cf50cf] to-[#2a97e6] rounded text-white hidden md:block'>Add New Student</Link>
   </div>
   </div>

    <div className='rounded shadow-md overflow-x-auto '>
      <DataTable
        columns={colomns}
        data={filteredStudent.length > 0 ? filteredStudent: students}
        pagination
        responsive
        customStyles={{
          headRow: {
            style: {
              color: 'white',
              backgroundColor: '#508FF7',
              fontSize: '13px',
              fontWeight: 'semi-bold',
              minHeight: '47px',
            },
          },
          rows: {
            style: {
              fontSize: '13px',
            },
          },
        }}
        progressPending={loading}
        highlightOnHover
      />
    </div>

   </div>
        </div>
      )
    }

   </div>
  )
}

export default Admin_Studentlist;

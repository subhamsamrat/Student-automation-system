
import { useNavigate } from "react-router-dom"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faEye, faEdit, faTrash, faMoneyBill1Wave} from "@fortawesome/free-solid-svg-icons"
import Viewstudent from "./Viewstudent"
import { useState } from "react"
import Editstudent from "./Editstudent"
//import Feeshistory from "../studentfees/Feeshistory"

export const colomns=[
          { name: 'Name', selector: (row) => row.name ,width: '190px' },
          //{ name: 'std', selector: (row) => row.std ,width: '200px', hide: "sm"?"":"lg"},
          { name: 'Image', selector: (row) => row.Image ,width: '150px' ,hide: "md"},
           { name: 'Department', selector: (row) => row.Department ,width: '190px', hide: "md"},
        //   { name: 'Year', selector: (row) => row.Year ,width: '150px'},
          { name: 'Roll_No', selector: (row) => row.Roll_No, sortable: "true", defaultSortDirection: 'asc' ,width: '190px', hide:"sm"},
          { name: 'Actions', selector: (row) => row.Action , center: "true" }
]

export const StdActionBtns = ({Id}) => {
    const navigate = useNavigate();
    const [showModal1, setShowmodal1] = useState(false)
    const [showModal2, setShowmodal2] = useState(false)
    const [showModal3, setShowmodal3] = useState(false)
    const [showModal4, setShowmodal4] = useState(false)

    return(
        <div className="flex space-x-1.5 md:space-x-2 lg:space-x-3 h-7 ">
            <button 
            onClick={() => setShowmodal1(true)}
            className="bg-gradient-to-br from-blue-500 to-blue-300 text-xs md:text-sm text-white px-2 md:px-3 py-1 cursor-pointer rounded-md">
                <FontAwesomeIcon icon={faEye} />
            </button>{showModal1&& <Viewstudent id={Id} onClose={() => setShowmodal1(false)}/>}

            <button 
            onClick={() => setShowmodal2(true)}
            className="bg-gradient-to-br from-yellow-500 to-yellow-300 text-xs md:text-sm text-white px-2 md:px-3 py-1 cursor-pointer rounded-md">
                <FontAwesomeIcon icon={faEdit} />
            </button>{showModal2&& <Editstudent id={Id} onClose={() => setShowmodal2(false)}/>}

            <button 
            onClick={() => setShowmodal3(true)}
            className="bg-gradient-to-br from-red-500 to-red-300 text-xs md:text-sm text-white px-2 md:px-3 py-1 cursor-pointer rounded-md">
                <FontAwesomeIcon icon={faTrash} />
            </button>{showModal3&& <Viewstudent id={Id} onClose={() => setShowmodal3(false)}/>}

             <button 
             onClick={() => setShowmodal4(true)}
            className="bg-gradient-to-br from-green-500 to-green-300 text-xs md:text-sm text-white px-2 md:px-3 py-1 cursor-pointer rounded-md">
                <FontAwesomeIcon icon={faMoneyBill1Wave} />
            </button>{showModal4&& <Feeshistory id={Id} onClose={() => setShowmodal4(false)}/>}
        </div>
    )
}
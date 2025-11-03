import { LogIn } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Login from "../Login";
import Profile from "../Profile";
   
function Navbar() {


    

  const navitem = (
    <>
      <li>
        <a href="/" >Home</a>
      </li>
      <li>
        <a href="/attendance">Attendance</a>
      </li>
      <li>
        <a href="/result">Results</a>
      </li>
      <li>
        <a href="/account">Account</a>
      </li>
    </>
  );
  const [sticky, setStikey] = useState(false);
  const [user,setUser]= useState();
  
   const localUser = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {

    if (localUser) {
      setUser(true);
    }else{
      setUser(false);
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setStikey(true);
      } else {
        setStikey(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <>
      <div
        className={`z-999 bg-base-300 h-18 w-full  shadow-sm  ${
          sticky
            ? "  shadow-md bg-base-300 duration-300 sticky top-0 transition-all ease-in-out"
            : ""
        }`}
      >
        <div className="navbar bg-base-100  md:w-350 md:ml-15 md:rounded-md">
          <div className="navbar-start">
            <div className="dropdown">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost lg:hidden"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {" "}
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h8m-8 6h16"
                  />{" "}
                </svg>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
              >
                {navitem}
              </ul>
            </div>
            <a className="md:ml-10 text-2xl font-bold">
              S<span className="text-blue-600">A</span>S
            </a>
          </div>
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1 ml-200">{navitem}</ul>
          </div>
          <div>
            {user ? (
              <div>
                <button 
                onClick={() => document.getElementById("profile_modal").showModal()}
                className="btn btn-ghost btn-circle">
                  <div className="indicator">
                    <img
                      src={localUser.image.url}
                      alt=""
                      className="h-10 w-10 rounded-full object-cover"
                    />
                  </div>
                
                </button>
                  <Profile />
              </div>
            ) : (
              <div>
                <a
                  className="bg-black text-white px-3 py-2 md:ml-0 ml-25 rounded-md hover:bg-slate-800 duration-300 cursor-pointer"
                  onClick={() =>
                    document.getElementById("login_modal").showModal()
                  }
                >
                  Login
                </a>
                <Login/>
              </div> 
            )}
            <Login />
          </div>

        </div>
      </div>
    </>
  );
}

export default Navbar;



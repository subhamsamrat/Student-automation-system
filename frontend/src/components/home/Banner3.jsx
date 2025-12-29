import React from "react";
import { Banner3_comp1 } from "./Banner3_comp1.jsx";
import Banner3_comp2 from "./Banner3_comp2.jsx";
//import Banner3_comp from './Banner3_comp.jsx'
import {
  Bnr3_modal1,
  Bnr3_modal2,
  Bnr3_modal3,
  Bnr3_modal4,
} from "./Bnr3_modal1.jsx";
//import Bnr3_modul_modals from "./Bnr3_modul_modal.jsx";

function Banner3() {
  const modules = [
    {
      id: 1,
      title: "Attendance Management System",
      img: "https://img.icons8.com/?size=96&id=as92zhgzsPbY&format=png",
    },
    {
      id: 2,
      title: "Exam Management System",
      img: "https://img.icons8.com/?size=160&id=MhJkWoOW6dEp&format=png",
    },
    {
      id: 3,
      title: "Fees management System",
      img: "https://img.icons8.com/?size=160&id=hv8US9NtPRjq&format=png",
    },
    {
      id: 4,
      title: "Upcoming Module in Next Version",
      img: "https://img.icons8.com/?size=160&id=vWnIFMLEvDsg&format=png",
    },
  ];
  return (
    <>
      <div className=" h-full w-full  ">
        <h2 className="font-bold text-center text-3xl mt-10">
          -:Our Modules:-
        </h2>
        <div className="mt-5 flex justify-evenly">
          {modules.map((item) =>
            item.id === 4 ? (
              <Banner3_comp2
                item={item}
                key={item.id}
                onClick={() => {
                  document.getElementById("my_modal_4").showModal();
                }}
              />
            ) : (
              <Banner3_comp1
                item={item}
                key={item.id}
                onClick={() => {
                  if (item.id === 1) {
                    document.getElementById("my_modal_1").showModal();
                  } else if (item.id === 2) {
                    document.getElementById("my_modal_2").showModal();
                  } else if (item.id === 3) {
                    document.getElementById("my_modal_3").showModal();
                  }
                }}
              />
            )
          )}
        </div>

        <Bnr3_modal1 />
        <Bnr3_modal2 />
        <Bnr3_modal3 />
        <Bnr3_modal4 />
      </div>
    </>
  );
}

export default Banner3;

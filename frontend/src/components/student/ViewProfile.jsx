import React, { useEffect } from "react";

export default function ViewProfileModal({ data, open }) {

  useEffect(() => {
    if (open) {
      document.getElementById("viewProfile_modal").showModal();
    }
  }, [open]);

  return (
    <dialog id="viewProfile_modal" className="modal">
      <div className="modal-box bg-white rounded-2xl p-0 shadow-xl border border-gray-200 overflow-hidden max-w-lg">

        <div className="relative h-30 bg-gradient-to-r from-blue-400 to-indigo-500">
          <img
            src={data?.image?.url}
            alt="profile"
            className="w-30 h-30 object-cover rounded-full border-4 border-white shadow-lg absolute -bottom-14 left-1/2 -translate-x-1/2"
          />
        </div>

        <div className="p-6 pt-15">
          <h2 className="text-2xl font-semibold text-center text-gray-800 capitalize">
            {data?.studentName}
          </h2>
          <p className="text-center text-gray-500">Roll No: {data?.rollNo}</p>

          <div className="mt-6 grid grid-cols-2 gap-3 text-sm">
            <Info label="DOB" value={new Date(data?.DOB).toLocaleDateString()} />
            <Info label="Gender" value={data?.gender} />
            <Info label="Parent Name" value={data?.parentName} />
            <Info label="Parent Phone" value={data?.parentPhoneNo} />
            <Info label="Email" value={data?.email} />
            <Info label="Phone" value={data?.phoneNo} />
            <Info label="Department" value={data?.department} />
            <Info label="Year" value={data?.year} />
            <Info label="State" value={data?.state} />
            <Info label="Zip Code" value={data?.zipCode} />
          </div>

          <div className="modal-action mt-2 flex justify-center">
            <form method="dialog">
              <button className="btn bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-8 rounded-xl hover:opacity-90">
                Close
              </button>
            </form>
          </div>
        </div>
      </div>
    </dialog>
  );
}

function Info({ label, value }) {
  return (
    <div className="bg-gray-50 p-2 rounded-xl border border-gray-200 shadow-sm">
      <p className="text-gray-500 text-xs">{label}</p>
      <p className="text-gray-800 font-semibold break-all">{value || "--"}</p>
    </div>
  );
}

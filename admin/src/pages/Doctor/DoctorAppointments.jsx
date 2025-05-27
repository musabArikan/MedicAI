import React, { useContext, useEffect } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { AppContext } from "../../context/AppContext";
import { assets } from "../../assets/assets";

const DoctorAppointments = () => {
  const {
    dToken,
    appointments,
    getAppointments,
    completeAppointment,
    cancelAppointment,
  } = useContext(DoctorContext);
  const { calculateAge, slotDateFormat, currency } = useContext(AppContext);
  useEffect(() => {
    if (dToken) {
      getAppointments();
    }
  }, [dToken]);
  return (
    <div className="w-full maw-w-6xl m-5">
      <p className="mb-3 text-lg font-medium">All Appointments</p>
      <div className="bg-white border border-gray-200 rounded text-sm max-h-[80vh] min-h-[50vh] overflow-y-scroll">
        <div className="max-sm:hidden grid grid-cols-[0.5fr_2fr_1fr_2fr_1fr_1fr] gap-1 py-3 px-6 border-b border-gray-200">
          <p>#</p>
          <p>Patient</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Fees</p>
          <p>Action</p>
        </div>
        {appointments.reverse().map((item, index) => (
          <div
            className="flex flex-wrap justify-between max-sm:gap-5 max-sm:text-base sm:grid 
            grid-cols-[0.5fr_2fr_1fr_2fr_1fr_1fr] gap-1 text-gray-500 items-center py-3 px-6 border-b border-gray-200 hover:bg-gray-50"
            key={index}
          >
            <p className="max-sm:hidden">{index + 1}</p>
            <div className="flex items-center gap-2">
              <img
                className="w-8 rounded-full"
                src={item.userData.image}
                alt=""
              />
              <p>{item.userData.name}</p>
            </div>
            <p className="max-sm:hidden">{calculateAge(item.userData.dob)} </p>
            <p>
              {slotDateFormat(item.slotDate)}, {item.slotTime}
            </p>
            <p>
              {currency} {item.amount}
            </p>
            {item.cancelled ? (
              <p className="text-red-400 text-xs font-medium ">Cancelled</p>
            ) : item.isCompleted ? (
              <p className="text-green-500 text-xs font-medium">Completed</p>
            ) : (
              <div className="flex gap-2">
                <button
                  onClick={() => cancelAppointment(item._id)}
                  className="w-24 py-2 bg-red-100/30 text-red-500 rounded-lg font-semibold hover:bg-red-200 transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={() => completeAppointment(item._id)}
                  className="w-24 py-2 bg-green-100/30 text-green-600 rounded-lg font-semibold hover:bg-green-200 transition cursor-pointer"
                >
                  Completed
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorAppointments;

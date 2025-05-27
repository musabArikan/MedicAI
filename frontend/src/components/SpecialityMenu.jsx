import React, { useState } from "react";
import { specialityData } from "../assets/assets";
import { Link } from "react-router-dom";
import assistantIcon from "../assets/assistant_icon.png";
import AssistantWidget from "./AssistantWidget";

const SpecialityMenu = () => {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="flex flex-col items-center gap-4 py-16 text-gray-800 "
      id="speciality"
    >
      <h1 className="text-3xl font-medium flex justify-center flex-col items-center">
        Find Your <span> Specialist with AI</span>
      </h1>
      <button
        className="bg-gradient-to-br from-primary to-blue-400 rounded-full shadow-lg p-2 hover:scale-110 transition-all border border-gray-200"
        onClick={() => setOpen(true)}
        aria-label="Open AI Assistant"
      >
        <img
          src={assistantIcon}
          alt="AI Assistant"
          className="w-17 h-17 bg-white rounded-full"
        />
      </button>
      {open && <AssistantWidget open={open} setOpen={setOpen} />}
      <p className="sm:w-1/3 text-center text-sm">
        Describe your symptoms to our AI assistant or browse the list to quickly
        find the right doctor for your needs.
      </p>
      <div className="flex sm:justify-center gap-4 pt-5 w-full overflow-scroll ">
        {specialityData.map((item, index) => (
          <Link
            className="flex flex-col items-center text-xs cursor-pointer flex-shrink-0 hover:translate-y-[-10px] transition-all duration-500"
            key={index}
            to={`/doctors/${item.speciality}`}
            onClick={() => scrollTo(0, 0)}
          >
            <img className="w-16 sm:w-24 mb-2" src={item.image} alt="" />
            <p>{item.speciality}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SpecialityMenu;

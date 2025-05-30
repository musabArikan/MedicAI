import React from "react";
import { assets } from "../assets/assets";
const Footer = () => {
  return (
    <div className="md:mx-10">
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
        {/* ------- Left Section ------- */}
        <div className="flex flex-col items-center min-sm:justify-center">
          <img
            src={assets.logo}
            alt=""
            className="mb-2 w-40  max-h-12 object-cover"
          />
          <p className="w-full md:w-2/3 text-gray-600 leading-6 max-sm:text-sm max-sm:text-center">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book.
          </p>
        </div>

        {/* ------- Center Section ------- */}
        <div className="max-sm:flex max-sm:flex-col max-sm:items-center">
          <p className="text-xl font-medium mb-5">COMPANY</p>
          <ul className="flex flex-col gap-2 text-gray-600">
            <li>Home</li>
            <li>About us</li>
            <li>Delivery</li>
            <li>Privacy policy</li>
          </ul>
        </div>

        {/* ------- Right Section ------- */}
        <div className="max-sm:flex max-sm:flex-col max-sm:items-center">
          <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
          <ul className="flex flex-col gap-2 text-gray-600">
            <li>+90 (543) 967 97 12</li>
            <li>arikan950@hotmail.com</li>
          </ul>
        </div>
      </div>
      {/* ------- Copyright Text ------- */}
      <div>
        <hr className="text-gray-400" />
        <p className="py-5 text-sm text-center ">
          Copyright 2025 @ Medic AI - All Right Reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;

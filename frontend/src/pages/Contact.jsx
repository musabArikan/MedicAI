import React from "react";
import { assets } from "../assets/assets";
const Contact = () => {
  return (
    <div>
      <div className="text-center text-2xl pt-10 text-gray-500">
        <p>
          CONTACT
          <span className="text-gray-700 font-semibold"> US</span>
        </p>
      </div>

      <div className="my-10 flex flex-col justify-center md:flex-row gap-10 mb-28 text-sm ">
        <img
          src={assets.contact_image}
          alt=""
          className="w-full md:max-w-[360px]"
        />
        <div className="flex flex-col gap-6 items-start justify-center">
          <p className="font-semibold text-lg text-gray-600">Our OFFICE</p>
          <p className="text-gray-500">
            Adnan Kahveci Neighborhood <br /> Beylikduzu/Istanbul/Turkey
          </p>

          <p className="text-gray-500">
            Tel: +90 (543) 967 97 12
            <br /> Email: arikan950@hotmail.com
          </p>
          <p className="font-semibold text-lg text-gray-600">
            CAREERS AT Medic AI
          </p>
          <p className="text-gray-500">
            Learn more about our teams and job openings.
          </p>
          <button className="border border-black px-8 py-4 hover:bg-black hover:text-white transition-all duration-500 ease-in-out">
            Explore Jobs
          </button>
        </div>
      </div>
    </div>
  );
};

export default Contact;

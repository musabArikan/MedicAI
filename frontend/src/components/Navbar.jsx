import { assets } from "../assets/assets";
import { Link, NavLink, useNavigate } from "react-router-dom";
import "../index.css";
import { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import AssistantWidget from "./AssistantWidget";

const Navbar = () => {
  const navigate = useNavigate();
  const { token, setToken, userData } = useContext(AppContext);
  const [showMenu, setShowMenu] = useState(false);

  const logout = () => {
    setToken(false);
    localStorage.removeItem("token");
    setShowMenu(false);
  };

  return (
    <div className="flex items-center sticky bg-white z-30 top-0 justify-between text-sm py-4 pr-4 mb-5 max-sm:h-18 md:mx-[10%]">
      <Link to="/">
        <img
          className="w-44 max-sm:w-38 max-h-12 object-cover cursor-pointer"
          src={assets.logo}
          alt=""
        />
      </Link>
      <a
        href="https://medicai-dashboard.onrender.com/"
        target="_blank"
        rel="noopener noreferrer"
        className="md:hidden py-2 px-4 ml-2 rounded-full bg-[#5f6fff] text-white font-semibold shadow hover:bg-blue-700 transition-all cursor-pointer"
      >
        Hospital M.
      </a>
      <ul className="hidden flex-1 justify-center md:flex items-center gap-5 font-medium">
        <NavLink
          to={"/"}
          onClick={() => {
            scrollTo(0, 0);
          }}
        >
          <li className="py-1">HOME</li>
          <hr className="border-none outline-none h-0.5 bg-primary  m-auto hidden" />
        </NavLink>
        <NavLink
          to={"/doctors"}
          onClick={() => {
            scrollTo(0, 0);
          }}
        >
          <li className="py-1">ALL DOCTORS</li>
          <hr className="border-none outline-none h-0.5 bg-primary  m-auto hidden" />
        </NavLink>
        <NavLink
          to={"/about"}
          onClick={() => {
            scrollTo(0, 0);
          }}
        >
          <li className="py-1">ABOUT</li>
          <hr className="border-none outline-none h-0.5 bg-primary  m-auto hidden" />
        </NavLink>
        <NavLink
          to={"/contact"}
          onClick={() => {
            scrollTo(0, 0);
          }}
        >
          <li className="py-1">CONTACT</li>
          <hr className="border-none outline-none h-0.5 bg-primary  m-auto hidden" />
        </NavLink>
        <a
          href="https://medicai-dashboard.onrender.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="py-2 px-4 ml-2 rounded-full bg-[#5f6fff] text-white font-semibold shadow hover:bg-blue-700 transition-all cursor-pointer"
        >
          Hospital Management
        </a>
      </ul>
      <div className="flex items-center gap-4">
        {token && userData ? (
          <div className="flex max-sm:hidden items-center gap-2 cursor-pointer relative group ">
            <img
              src={userData.image}
              alt=""
              className=" w-12 h-12 rounded-full  shadow-sm border border-primary  "
            />
            <img src={assets.dropdown_icon} alt="" className="w-2.5" />
            <div className="absolute top-0 right-0 pt-14 text-base font-medium text-white hidden group-hover:block z-10 ">
              <div className="min-w-52 bg-gradient-to-br from-primary to-blue-400 rounded-2xl shadow-xl flex flex-col gap-2 py-3 px-2 border border-blue-200 animate-fadeIn">
                <p
                  onClick={() => navigate("my-appointments")}
                  className="transition-all duration-200 hover:text-[#5f6fff] hover:bg-white hover:scale-105 cursor-pointer px-5 py-3 rounded-xl border border-transparent hover:border-[#5f6fff]"
                >
                  Appointments
                </p>
                <p
                  onClick={() => {
                    navigate("my-profile");
                    scrollTo(0, 0);
                  }}
                  className="transition-all duration-200 hover:text-[#5f6fff] hover:bg-white hover:scale-105 cursor-pointer px-5 py-3 rounded-xl border border-transparent hover:border-[#5f6fff]"
                >
                  Edit Profile
                </p>

                <NavLink
                  to={"/"}
                  onClick={() => {
                    logout();
                    scrollTo(0, 0);
                  }}
                  className="transition-all duration-200 hover:text-red-500 hover:bg-white hover:scale-105 cursor-pointer px-5 py-3 rounded-xl border border-transparent hover:border-red-400"
                >
                  Logout
                </NavLink>
              </div>
            </div>
          </div>
        ) : (
          <button
            className="bg-primary text-white px-8 py-2 rounded-full font-light  md:block cursor-pointer text-nowrap"
            onClick={() => {
              navigate("/login");
              scrollTo(0, 0);
            }}
          >
            Login
          </button>
        )}

        {/* ----- Mobile Menu ----- */}

        {token && userData ? (
          <>
            {/* Mobil profile ve menu icon */}
            <div
              className="sm:hidden flex items-center gap-2 cursor-pointer relative"
              onClick={() => setShowMenu((prev) => !prev)}
            >
              <img
                src={userData.image}
                alt=""
                className="w-11 h-11 rounded-full  shadow-sm   border border-primary "
              />
              <img
                src={assets.dropdown_icon}
                alt=""
                className={`w-3 transition-transform duration-200 ${
                  showMenu ? "rotate-180" : ""
                }`}
              />
            </div>
          </>
        ) : (
          ""
        )}
        {/* Mobil Menu ve Profile Dropdown */}
        <div
          className={`sm:hidden fixed top-0 right-0 left-0 z-30 bg-gradient-to-br from-primary to-blue-400 shadow-2xl transition-all duration-300 ${
            showMenu
              ? "h-screen opacity-100"
              : "h-0 opacity-0 pointer-events-none"
          } overflow-y-auto border-t-4 border-blue-200 animate-fadeIn`}
        >
          <div className="flex max-sm:h-18 items-center justify-between px-6 py-5 border-b border-b-blue-200 bg-white/20 rounded-t-2xl shadow-md">
            <div className="flex items-center gap-3">
              <img
                src={userData?.image}
                alt="profile"
                className="w-11 h-11 rounded-full border-2 border-primary bg-white shadow"
              />
              <div className="flex gap-5">
                <span className="font-medium text-base text-white drop-shadow-lg">
                  {userData?.name}
                </span>
                <button
                  onClick={() => {
                    setShowMenu(false);
                    navigate("my-profile");
                    scrollTo(0, 0);
                  }}
                  className="text-xs px-3 py-1 border border-white rounded-full bg-white text-primary transition"
                  title="Edit Profile"
                >
                  Edit Profile
                </button>
              </div>
            </div>
            <img
              onClick={() => {
                setShowMenu(false);
                scrollTo(0, 0);
              }}
              src={assets.cross_icon}
              alt="close"
              className="w-6 cursor-pointer hover:scale-110 transition-transform"
            />
          </div>
          <div className="flex flex-col items-center gap-6 py-8">
            <div className="w-full max-w-xs flex flex-col gap-2 mt-2">
              <div className="flex justify-center ">
                <NavLink
                  onClick={() => {
                    setShowMenu(false);
                    scrollTo(0, 0);
                  }}
                  to={"/"}
                  className={({ isActive }) =>
                    `block px-4 py-2 rounded-xl text-center w-40 font-medium transition-all duration-200 ${
                      isActive
                        ? "bg-white text-primary shadow"
                        : "text-white hover:bg-white/80 hover:text-[#5f6fff]"
                    }`
                  }
                >
                  HOME
                </NavLink>
              </div>
              <div className="flex justify-center ">
                <NavLink
                  onClick={() => {
                    setShowMenu(false);
                    scrollTo(0, 0);
                  }}
                  to={"/my-appointments"}
                  className={({ isActive }) =>
                    `block px-4 py-2 rounded-xl text-center w-40 font-medium transition-all duration-200 ${
                      isActive
                        ? "bg-white text-primary shadow"
                        : "text-white hover:bg-white/80 hover:text-[#5f6fff]"
                    }`
                  }
                >
                  APPOINTMENTS
                </NavLink>
              </div>
              <div className="flex justify-center ">
                <NavLink
                  onClick={() => {
                    setShowMenu(false);
                    scrollTo(0, 0);
                  }}
                  to={"/doctors"}
                  className={({ isActive }) =>
                    `block px-4 py-2 rounded-xl text-center w-40 font-medium transition-all duration-200 ${
                      isActive
                        ? "bg-white text-primary shadow"
                        : "text-white hover:bg-white/80 hover:text-[#5f6fff]"
                    }`
                  }
                >
                  ALL DOCTORS
                </NavLink>
              </div>
              <div className="flex justify-center ">
                <NavLink
                  onClick={() => {
                    setShowMenu(false);
                    scrollTo(0, 0);
                  }}
                  to={"/about"}
                  className={({ isActive }) =>
                    `block px-4 py-2 rounded-xl text-center w-40 font-medium transition-all duration-200 ${
                      isActive
                        ? "bg-white text-primary shadow"
                        : "text-white hover:bg-white/80 hover:text-[#5f6fff]"
                    }`
                  }
                >
                  ABOUT
                </NavLink>
              </div>
              <div className="flex justify-center ">
                <NavLink
                  onClick={() => {
                    setShowMenu(false);
                    scrollTo(0, 0);
                  }}
                  to={"/contact"}
                  className={({ isActive }) =>
                    `block px-4 py-2 rounded-xl text-center w-40 font-medium transition-all duration-200 ${
                      isActive
                        ? "bg-white text-primary shadow"
                        : "text-white hover:bg-white/80 hover:text-[#5f6fff]"
                    }`
                  }
                >
                  CONTACT
                </NavLink>
              </div>
              <div className="flex justify-center mt-4">
                <NavLink
                  to={"/"}
                  onClick={() => {
                    logout();
                    scrollTo(0, 0);
                  }}
                  className="text-red-400 text-center py-1 cursor-pointer bg-white/50 font-semibold border uppercase rounded-full border-red-300 w-23 hover:bg-red-100 hover:text-red-600 transition"
                >
                  Logout
                </NavLink>
              </div>
            </div>
          </div>
          <p className="py-5 text-[15px] text-center text-white w-full mt-auto drop-shadow-lg">
            Copyright 2025 @ Medic AI - All Right Reserved.
          </p>
        </div>
      </div>
      <AssistantWidget />
    </div>
  );
};

export default Navbar;

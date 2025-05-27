import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Doctors from "./pages/Doctors";
import Login from "./pages/Login";
import About from "./pages/About";
import Contact from "./pages/Contact";
import MyProfile from "./pages/MyProfile";
import MyAppointments from "./pages/MyAppointments";
import Appointment from "./pages/Appointment";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { ToastContainer, toast } from "react-toastify";
import AssistantWidget from "./components/AssistantWidget";
import { AssistantProvider } from "./context/AssistantContext";

const App = () => {
  return (
    <AssistantProvider>
      <div>
        <Navbar />
        <div className="mx-4 sm:mx-[10%]">
          <ToastContainer />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/doctors" element={<Doctors />} />
            <Route path="/doctors/:specialty" element={<Doctors />} />
            <Route path="/login" element={<Login />} />
            <Route path="/About" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/my-profile" element={<MyProfile />} />
            <Route path="/my-appointments" element={<MyAppointments />} />
            <Route path="/appointment/:docId" element={<Appointment />} />
          </Routes>
        </div>
        <AssistantWidget />
        <Footer />
      </div>
    </AssistantProvider>
  );
};

export default App;

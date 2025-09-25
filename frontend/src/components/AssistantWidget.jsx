import React, { useState, useContext } from "react";
import axios from "axios";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import { useAssistant } from "../context/AssistantContext";
import AssistantWidgetPopup from "./AssistantWidgetPopup";
import assistantIcon from "../assets/assistant_icon.png";

const AssistantWidget = () => {
  const { backendUrl } = useContext(AppContext);
  const { assistantOpen, setAssistantOpen } = useAssistant();
  const navigate = useNavigate();
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [showContinue, setShowContinue] = useState(false);
  const [redirectRoute, setRedirectRoute] = useState(null);
  const [isClosing, setIsClosing] = useState(false);
  const [open, setOpen] = useState(false);

  const handleAsk = async () => {
    setLoading(true);
    setResponse("");
    setShowContinue(false);
    setRedirectRoute(null);
    try {
      const res = await axios.post(`${backendUrl}/api/ai/diagnose`, {
        content: input,
      });
      const data = res.data;
      if (data.success) {
        if (data.polyclinic) {
          setResponse(data.text);
          let route = null;
          if (data.polyclinic === "General physician")
            route = "/doctors/General_physician";
          if (data.polyclinic === "Gynecologist")
            route = "/doctors/Gynecologist";
          if (data.polyclinic === "Dermatologist")
            route = "/doctors/Dermatologist";
          if (data.polyclinic === "Pediatricians")
            route = "/doctors/Pediatricians";
          if (data.polyclinic === "Neurologist") route = "/doctors/Neurologist";
          if (route) {
            setShowContinue(true);
            setRedirectRoute(route);
          }
        } else {
          setResponse(
            "We couldn't find a suitable specialist for your case yet. Our AI service will be updated soon to support more specialties. Please try again later or contact a general physician."
          );
        }
      } else {
        setResponse(data.message || "AI service error.");
      }
    } catch (err) {
      setResponse("AI service error.");
    }
    setLoading(false);
  };

  const closePopup = () => {
    setIsClosing(true);
    setTimeout(() => {
      setAssistantOpen(false);
      setIsClosing(false);
      setInput("");
      setResponse("");
      setShowContinue(false);
      setRedirectRoute(null);
    }, 100);
  };

  const handleContinue = () => {
    if (redirectRoute) {
      closePopup();
      navigate(redirectRoute);
      setTimeout(() => window.scrollTo(0, 0), 100);
    }
  };

  return (
    <>
      {!open && (
        <button
          className="fixed bottom-6 right-6 z-50 bg-gradient-to-br from-primary to-blue-400 rounded-full shadow-lg p-3 hover:scale-110 transition-all cursor-pointer border border-gray-200 animate-pulse-assistant flex flex-col items-center"
          onClick={() => setOpen(true)}
          aria-label="Open AI Assistant"
        >
          <img
            src={assistantIcon}
            alt="AI Assistant"
            className="w-16 h-16 bg-white rounded-full mb-1"
          />
          <span className="text-xs font-semibold text-white">MEDICAI</span>
        </button>
      )}
      {open && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 z-50 bg-black/40 transition-opacity animate-fade-in"
            onClick={() => setOpen(false)}
          />
          {/* Widget Popup */}
          <AssistantWidgetPopup open={open} onClose={() => setOpen(false)} />
        </>
      )}
    </>
  );
};

export default AssistantWidget;

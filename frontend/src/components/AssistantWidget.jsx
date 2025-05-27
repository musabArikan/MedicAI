import React, { useState, useContext } from "react";
import axios from "axios";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import { useAssistant } from "../context/AssistantContext";
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
      {!assistantOpen && (
        <button
          className="fixed bottom-6 right-6 z-50 bg-gradient-to-br from-primary to-blue-400 rounded-full shadow-lg p-3  hover:scale-110 transition-all border border-gray-200 animate-pulse-assistant"
          onClick={() => setAssistantOpen(true)}
          aria-label="Open AI Assistant"
        >
          <img
            src={assistantIcon}
            alt="AI Assistant"
            className="w-17 h-17 bg-white rounded-full"
          />
          <span className="text-xs font-semibold text-white">MEDICAI</span>
        </button>
      )}
      {assistantOpen && (
        <div
          className={`fixed inset-0 z-50 flex items-end justify-end transition-all duration-300 ${
            isClosing
              ? "opacity-0 scale-90 pointer-events-none"
              : "opacity-100 scale-100"
          }`}
        >
          <div className="bg-black/30 absolute inset-0" onClick={closePopup} />
          <div className="relative bg-white rounded-xl shadow-2xl p-6 m-6 w-full max-w-sm flex flex-col gap-3 z-10 border border-gray-200">
            <button
              className="absolute top-2 right-2 cursor-pointer text-gray-400 hover:text-gray-700"
              onClick={closePopup}
            >
              &#10005;
            </button>
            <h2 className="text-lg font-semibold mb-2">AI Health Assistant</h2>
            <p className="text-sm text-gray-600">
              Please briefly describe your symptoms or health concern.
              <br />
              You can also write in Turkish.
            </p>
            <textarea
              className="w-full border border-blue-600 rounded p-2 mt-2 text-sm min-h-[60px] focus:outline-[#5f6fff] resize-none"
              placeholder="For example: I have a headache, fever... / Karın ağrım var, ateşim yükseldi..."
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
                if (response && e.target.value === "") {
                  setResponse("");
                  setShowContinue(false);
                  setRedirectRoute(null);
                } else if (response && !showContinue) {
                  setResponse("");
                }
              }}
            />
            <button
              className="bg-primary cursor-pointer text-white rounded px-4 py-2 mt-2 hover:bg-blue-700 transition disabled:opacity-60"
              disabled={!input.trim() || loading}
              onClick={handleAsk}
              style={{ display: response || loading ? "none" : "block" }}
            >
              Book with AI
            </button>
            {response && (
              <div className="bg-gray-50 border rounded p-2 mt-2 text-sm text-gray-800 whitespace-pre-line">
                {response}
                {showContinue && (
                  <button
                    className="bg-blue-500 cursor-pointer text-white rounded px-4 py-2 mt-4 hover:bg-blue-700 transition"
                    onClick={handleContinue}
                  >
                    Continue to Doctor
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default AssistantWidget;

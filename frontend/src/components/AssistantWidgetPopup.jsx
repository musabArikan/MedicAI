import assistantIcon from "../assets/assistant_icon.png";
import { useState, useContext } from "react";
import axios from "axios";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const AssistantWidgetPopup = ({ open, onClose }) => {
  const { backendUrl } = useContext(AppContext);
  const navigate = useNavigate();
  const [input, setInput] = useState(
    "I have acne on my face. What should I do?"
  );
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [showContinue, setShowContinue] = useState(false);
  const [redirectRoute, setRedirectRoute] = useState(null);

  if (!open) return null;

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

  const handleContinue = () => {
    if (redirectRoute) {
      onClose();
      navigate(redirectRoute);
      setTimeout(() => window.scrollTo(0, 0), 100);
    }
  };

  return (
    <div className="fixed left-1/2 -translate-x-1/2 bottom-6 right-auto m-0 z-50 bg-white rounded-2xl shadow-lg p-6 w-full max-w-sm flex flex-col gap-4 border border-gray-100 animate-fade-in-up md:left-auto md:right-6 md:translate-x-0 md:m-6">
      <div className="flex justify-between items-center mb-3">
        <div className="font-semibold text-gray-900 text-lg tracking-tight">
          AI Health Assistant
        </div>
        <button
          onClick={onClose}
          className="text-primary text-2xl font-bold transition-colors duration-150 rounded-full w-8 h-8 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-primary"
          aria-label="Close"
        >
          &times;
        </button>
      </div>
      <div>
        <textarea
          className="w-full border border-primary rounded-lg p-3 mt-2 text-sm min-h-[48px] focus:outline-none focus:ring-2 focus:ring-primary mb-2 resize-none transition-all"
          placeholder="Please briefly describe your symptoms or health concern."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={loading}
          rows={2}
        />
        <div className="w-full mb-2">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-8">
              <div className="relative flex items-center justify-center">
                <img
                  src={assistantIcon}
                  alt="Assistant Loading"
                  className="w-16 h-16 z-10 animate-fade-in"
                />
                <span
                  className="absolute w-20 h-20 rounded-full border-4 border-primary border-t-transparent animate-spin"
                  style={{ borderTopColor: "#fff" }}
                ></span>
              </div>
              <span className="mt-4 text-primary font-semibold text-sm animate-pulse">
                Thinking...
              </span>
            </div>
          ) : !response ? (
            <button
              className={`w-full flex items-center justify-center cursor-pointer text-white rounded-lg px-4 py-2 font-semibold border  transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-primary ${
                !input
                  ? "bg-blue-300 hover:bg-primary"
                  : "bg-primary hover:bg-blue-600"
              }`}
              onClick={handleAsk}
              disabled={loading || !input}
              aria-label="Ask Assistant"
            >
              Book with AI
            </button>
          ) : (
            <div className="bg-gray-50 border rounded p-2 mt-2 text-sm text-gray-800 whitespace-pre-line w-full flex flex-col items-center">
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
    </div>
  );
};

export default AssistantWidgetPopup;

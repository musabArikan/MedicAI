import React, { useState, useContext } from "react";
import axios from "axios";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import assistantIcon from "../assets/assistant_icon.png";

const AssistantWidget = () => {
  const { backendUrl } = useContext(AppContext);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAsk = async () => {
    setLoading(true);
    setResponse("");
    try {
      const res = await axios.post(`${backendUrl}/api/ai/diagnose`, {
        content: input,
      });
      const data = res.data;
      if (data.success) {
        setResponse(data.text);

        if (data.polyclinic) {
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
            setTimeout(() => {
              setOpen(false);
              navigate(route);
            }, 2000);
          }
        }
      } else {
        setResponse(data.message || "AI service error.");
      }
    } catch (err) {
      setResponse("AI service error.");
    }
    setLoading(false);
  };

  return (
    <>
      <button
        className="fixed bottom-6 right-6 z-50 bg-gradient-to-br from-primary to-blue-400 rounded-full shadow-lg p-2 hover:scale-110 transition-all border border-gray-200 animate-pulse-assistant"
        onClick={() => setOpen(true)}
        aria-label="Open AI Assistant"
      >
        <img
          src={assistantIcon}
          alt="AI Assistant"
          className="w-17 h-17 bg-white rounded-full"
        />
      </button>
      {open && (
        <div className="fixed inset-0 z-50 flex items-end justify-end">
          <div
            className="bg-black/30 absolute inset-0"
            onClick={() => setOpen(false)}
          />
          <div className="relative bg-white rounded-xl shadow-2xl p-6 m-6 w-full max-w-sm flex flex-col gap-3 z-10 border border-gray-200">
            <button
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-700"
              onClick={() => setOpen(false)}
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
              className="w-full border rounded p-2 mt-2 text-sm min-h-[60px]"
              placeholder="For example: I have a headache, fever... / Karın ağrım var, ateşim yükseldi..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button
              className="bg-primary text-white rounded px-4 py-2 mt-2 hover:bg-blue-700 transition disabled:opacity-60"
              disabled={!input.trim() || loading}
              onClick={handleAsk}
            >
              {loading ? "Thinking..." : "Send"}
            </button>
            {response && (
              <div className="bg-gray-50 border rounded p-2 mt-2 text-sm text-gray-800 whitespace-pre-line">
                {response}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default AssistantWidget;

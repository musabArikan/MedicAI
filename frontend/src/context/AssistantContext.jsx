import React, { createContext, useState, useContext } from "react";

const AssistantContext = createContext();

export const AssistantProvider = ({ children }) => {
  const [assistantOpen, setAssistantOpen] = useState(false);
  return (
    <AssistantContext.Provider value={{ assistantOpen, setAssistantOpen }}>
      {children}
    </AssistantContext.Provider>
  );
};

export const useAssistant = () => useContext(AssistantContext);

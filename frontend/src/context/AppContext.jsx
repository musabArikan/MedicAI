import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const currencySymbol = "$";
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [doctors, setDoctors] = useState([]);
  const [token, setToken] = useState(
    localStorage.getItem("token") ? localStorage.getItem("token") : false
  );
  const [userData, setUserData] = useState(false);
  const getDoctorsData = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/doctor/list`);
      if (data.success) {
        setDoctors(data.doctors);
      } else {
        toast.error(data.message || "Failed to fetch doctors.");
      }
    } catch (error) {
      console.log("Error fetching doctors:", error);
      toast.error(error.message || "An error occurred while fetching doctors.");
    }
  };
  const loadUserProfileData = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/user/get-profile`, {
        headers: { token },
      });
      if (data.success) {
        setUserData(data.userData);
      } else {
        console.log("Error loading user profile:", data.message);
        toast.error(data.message || "Failed to load user profile.");
      }
    } catch (error) {}
  };

  const autoLogin = async () => {
    if (!localStorage.getItem("token")) {
      try {
        const { data } = await axios.post(`${backendUrl}/api/user/login`, {
          email: "tester@medicai.com",
          password: "12345678",
        });
        if (data.success && data.token) {
          setToken(data.token);
          localStorage.setItem("token", data.token);
        }
      } catch (err) {
        toast.error("Demo user login failed.");
      }
    }
  };

  useEffect(() => {
    getDoctorsData();
    autoLogin();
  }, []);

  useEffect(() => {
    if (token) {
      loadUserProfileData();
    } else {
      setUserData(false);
    }
  }, [token]);

  const value = {
    doctors,
    getDoctorsData,
    currencySymbol,
    token,
    setToken,
    backendUrl,
    userData,
    setUserData,
    loadUserProfileData,
    autoLogin,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContextProvider;

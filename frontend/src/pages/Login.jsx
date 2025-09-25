import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const { backendUrl, token, setToken } = useContext(AppContext);
  const navigate = useNavigate();

  const [state, setState] = useState("Login");

  const [email, setEmail] = useState("tester@medicai.com");
  const [password, setPassword] = useState("12345678");
  const [name, setName] = useState("");
  const [autoLoginTried, setAutoLoginTried] = useState(false);

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      if (state === "Sign Up") {
        const { data } = await axios.post(`${backendUrl}/api/user/register`, {
          name,
          email,
          password,
        });
        if (data.success) {
          setToken(data.token);
          localStorage.setItem("token", data.token);
          localStorage.removeItem("autoLoginDisabled");
          toast.success("Successfully registered and logged in!");
          navigate("/");
        } else {
          toast.error(data.message || "Registration failed.");
        }
      } else {
        const { data } = await axios.post(`${backendUrl}/api/user/login`, {
          email,
          password,
        });
        if (data.success) {
          setToken(data.token);
          localStorage.setItem("token", data.token);
          localStorage.removeItem("autoLoginDisabled");
          toast.success("Successfully logged in!");
          navigate("/");
        } else {
          toast.error(data.message || "Login failed.");
        }
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message || error.message || "An error occurred."
      );
    }
  };

  useEffect(() => {
    if (!autoLoginTried && !localStorage.getItem("autoLoginDisabled")) {
      const localToken = localStorage.getItem("token");
      if (localToken) {
        setToken(localToken);
        toast.success("Auto login successful!");
        navigate("/");
      }
      setAutoLoginTried(true);
    }
  }, [autoLoginTried, setToken, navigate]);

  return (
    <form onSubmit={onSubmitHandler} className="min-h-[80vh] flex items-center">
      <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border border-gray-200 rounded-xl text-zinc-600 text-sm shadow-lg">
        <p className="text-2xl font-semibold">
          {state === "Sign Up" ? "Create Account" : "Login"}
        </p>
        <p>
          Please {state === "Sign Up" ? "sign up" : "log in"} to book
          appointment
        </p>
        {state === "Sign Up" && (
          <div className="w-full">
            <p>Full Name</p>
            <input
              type="text"
              onChange={(e) => setName(e.target.value)}
              value={name}
              required
              className="border border-zinc-300 rounded w-full p-2 mt-1"
            />
          </div>
        )}
        <div className="w-full">
          <p>Email</p>
          <input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
            className="border border-zinc-300 rounded w-full p-2 mt-1"
          />
        </div>
        <div className="w-full">
          <p>Password</p>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
            className="border border-zinc-300 rounded w-full p-2 mt-1"
          />
        </div>
        <button
          type="submit"
          className="bg-primary text-white w-full py-2 rounded-md text-base mt-2 font-semibold cursor-pointer"
        >
          {state === "Sign Up" ? "Create Account" : "Login"}
        </button>

        {state === "Sign Up" ? (
          <p className="mt-2">
            Already have an account?{" "}
            <span
              className="text-primary underline cursor-pointer"
              onClick={() => setState("Login")}
            >
              Login here
            </span>
          </p>
        ) : (
          <p className="mt-2">
            Create an new account?{" "}
            <span
              className="text-primary underline cursor-pointer"
              onClick={() => setState("Sign Up")}
            >
              Click here
            </span>
          </p>
        )}
      </div>
    </form>
  );
};

export default Login;

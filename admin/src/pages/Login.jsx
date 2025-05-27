import React, { useContext, useState } from "react";
import { AdminContext } from "../context/AdminContext";
import axios from "axios";
import { toast } from "react-toastify";
import { DoctorContext } from "../context/DoctorContext";
const Login = () => {
  const [state, setState] = useState("Hospital");

  const [email, setEmail] = useState("admin@medicai.com");
  const [password, setPassword] = useState("admin123");

  const { setAToken, backendUrl } = useContext(AdminContext);
  const { setDToken } = useContext(DoctorContext);
  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      if (state === "Hospital") {
        const { data } = await axios.post(backendUrl + "/api/admin/login", {
          email,
          password,
        });
        if (data.success) {
          localStorage.setItem("aToken", data.token);
          setAToken(data.token);
        } else {
          toast.error(data.message);
        }
      } else {
        setEmail("richard@medicai.com");
        setPassword("12345678");
        const { data } = await axios.post(backendUrl + "/api/doctor/login", {
          email: "richard@medicai.com",
          password: "12345678",
        });
        if (data.success) {
          localStorage.setItem("dToken", data.token);
          setDToken(data.token);
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {}
  };

  React.useEffect(() => {
    if (state === "Hospital") {
      setEmail("admin@medicai.com");
      setPassword("admin123");
    } else if (state === "Doctor") {
      setEmail("richard@medicai.com");
      setPassword("12345678");
    }
  }, [state]);

  return (
    <form className="min-h-[80vh] flex items-center" onSubmit={onSubmitHandler}>
      <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-[#5E5E5E]text-sm shadow-lg border-gray-200">
        <p className="text-2xl font-semibold m-auto ">
          <span className="text-primary">{state}</span> Login
        </p>
        <div className="w-full">
          <p>Email</p>
          <input
            className="border border-[#DADADA] rounded w-full p-2 mt-1 "
            type="email"
            required
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>
        <div className="w-full">
          <p>Password</p>
          <input
            className="border border-[#DADADA] rounded w-full p-2 mt-1 "
            type="password"
            required
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>

        <button className="bg-primary text-white w-full py-2 rounded-md text-base">
          Login
        </button>
        {state === "Hospital" ? (
          <p>
            Doctor Login?{" "}
            <span
              className="text-primary underline cursor-pointer"
              onClick={() => setState("Doctor")}
            >
              Click Here
            </span>
          </p>
        ) : (
          <p>
            Hospital Login?{" "}
            <span
              className="text-primary underline cursor-pointer"
              onClick={() => setState("Hospital")}
            >
              Click Here
            </span>
          </p>
        )}
      </div>
    </form>
  );
};

export default Login;

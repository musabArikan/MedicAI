import { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets";
import { toast } from "react-toastify";
import axios from "axios";
const MyProfile = () => {
  const { userData, setUserData, token, backendUrl, loadUserProfileData } =
    useContext(AppContext);
  const [isEdit, setIsEdit] = useState(false);
  const [image, setImage] = useState(false);
  const updateUserProfileData = async () => {
    try {
      const formData = new FormData();
      formData.append("name", userData.name);
      formData.append("phone", userData.phone);
      formData.append("address", JSON.stringify(userData.address));
      formData.append("gender", userData.gender);
      formData.append("dob", userData.dob);

      image && formData.append("image", image);

      const { data } = await axios.post(
        `${backendUrl}/api/user/update-profile`,
        formData,
        {
          headers: { token },
        }
      );
      if (data.success) {
        toast.success(data.message);
        await loadUserProfileData();
        setIsEdit(false);
        setImage(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  return (
    userData && (
      <div className="max-w-xl mx-auto bg-white rounded-2xl shadow-lg p-8 mt-8 flex flex-col gap-6 border border-gray-200">
        {/* Header */}
        <div className="flex items-center  mb-2">
          <div>
            <h2 className="text-2xl font-bold text-primary mb-1">
              Edit Profile
            </h2>
            <p className="text-gray-500 text-sm">
              Update your personal information
            </p>
          </div>
        </div>
        <hr className="bg-zinc-300 h-[1px] border-none mb-2" />
        {/* Profile Image & Name */}
        <div className="flex flex-col items-center gap-2">
          {isEdit ? (
            <label htmlFor="image" className="relative cursor-pointer group">
              <img
                className="w-32 h-32 rounded-full object-cover border-2 border-primary shadow opacity-80 group-hover:opacity-60 transition"
                src={image ? URL.createObjectURL(image) : userData.image}
                alt="Profile Preview"
              />
              <div className="absolute bottom-2 right-2 bg-primary p-2 rounded-full shadow-lg">
                <img className="w-6" src={assets.upload_icon} alt="Upload" />
              </div>
              <input
                onChange={(e) => setImage(e.target.files[0])}
                type="file"
                id="image"
                hidden
              />
            </label>
          ) : (
            <img
              src={userData.image}
              alt=""
              className="w-32 h-32 rounded-full border-2 border-primary shadow"
            />
          )}
          {isEdit ? (
            <input
              type="text"
              value={userData.name}
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, name: e.target.value }))
              }
              className="bg-gray-50 text-2xl font-semibold text-center rounded px-3 py-1 mt-2 border border-gray-200 focus:outline-[#5f6fff] w-60"
              placeholder="Your Name"
            />
          ) : (
            <p className="font-semibold text-2xl text-neutral-800 mt-2">
              {userData.name}
            </p>
          )}
        </div>
        {/* Contact Info */}
        <div className="bg-gray-50 rounded-xl p-5 mt-2">
          <p className="text-primary font-semibold mb-3 tracking-wide">
            Contact Information
          </p>
          <div className="grid grid-cols-[70px_1fr] gap-y-3 gap-x-2 text-neutral-700">
            <span className="font-medium  ">Email:</span>
            <span className="text-blue-500 break-all max-sm:max-w-[180px]">
              {userData.email}
            </span>
            <span className="font-medium">Phone:</span>
            {isEdit ? (
              <input
                type="text"
                value={userData.phone}
                onChange={(e) =>
                  setUserData((prev) => ({ ...prev, phone: e.target.value }))
                }
                className="bg-white border max-sm:max-w-[180px] border-gray-200 rounded px-2 py-1 focus:outline-[#5f6fff]"
                placeholder="Phone Number"
              />
            ) : (
              <span className="text-blue-400">{userData.phone}</span>
            )}
            <span className="font-medium">Address:</span>
            {isEdit ? (
              <div className="flex flex-col gap-1">
                <input
                  type="text"
                  onChange={(e) =>
                    setUserData((prev) => ({
                      ...prev,
                      address: { ...prev.address, line1: e.target.value },
                    }))
                  }
                  className="bg-white border max-sm:max-w-[180px] border-gray-200 rounded px-2 py-1 focus:outline-[#5f6fff]"
                  value={userData.address.line1}
                  placeholder="Address Line 1"
                />
                <input
                  type="text"
                  onChange={(e) =>
                    setUserData((prev) => ({
                      ...prev,
                      address: { ...prev.address, line2: e.target.value },
                    }))
                  }
                  className="bg-white border max-sm:max-w-[180px] border-gray-200 rounded px-2 py-1 focus:outline-[#5f6fff]"
                  value={userData.address.line2}
                  placeholder="Address Line 2"
                />
              </div>
            ) : (
              <span className="text-gray-500">
                {userData.address.line1} <br /> {userData.address.line2}
              </span>
            )}
          </div>
        </div>
        {/* Basic Info */}
        <div className="bg-gray-50 rounded-xl p-5">
          <p className="text-primary font-semibold mb-3 tracking-wide">
            Basic Information
          </p>
          <div className="grid grid-cols-[70px_1fr] gap-y-3 gap-x-2 text-neutral-700">
            <span className="font-medium">Gender:</span>
            {isEdit ? (
              <select
                className="bg-white border border-gray-200 rounded px-2 py-1 focus:outline-[#5f6fff] max-w-[120px]"
                value={userData.gender}
                onChange={(e) =>
                  setUserData((prev) => ({ ...prev, gender: e.target.value }))
                }
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            ) : (
              <span className="text-gray-400">{userData.gender}</span>
            )}
            <span className="font-medium">Birthday:</span>
            {isEdit ? (
              <input
                type="date"
                onChange={(e) =>
                  setUserData((prev) => ({ ...prev, dob: e.target.value }))
                }
                value={userData.dob}
                className="bg-white border border-gray-200 rounded px-2 py-1 focus:outline-[#5f6fff] max-w-[140px]"
              />
            ) : (
              <span className="text-gray-400">{userData.dob}</span>
            )}
          </div>
        </div>
        {/* Save/Edit Button */}
        <div className="flex justify-end mt-6">
          {isEdit ? (
            <button
              className="bg-primary text-white px-8 py-2 rounded-full font-semibold hover:bg-[#5f6fff] transition-all shadow"
              onClick={updateUserProfileData}
            >
              Save Changes
            </button>
          ) : (
            <button
              className="border border-primary text-primary px-8 py-2 rounded-full font-semibold hover:bg-[#5f6fff]hover:text-white transition-all shadow"
              onClick={() => setIsEdit(true)}
            >
              Edit Profile
            </button>
          )}
        </div>
      </div>
    )
  );
};

export default MyProfile;

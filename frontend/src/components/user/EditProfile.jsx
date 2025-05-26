import { assets } from "@/assets/assets";
import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/userSlice";

const EditProfile = ({ setOpenPopup }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [phone, setPhone] = useState("");
  const [photo, setPhoto] = useState("");
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false)

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true)
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("role", role);
      formData.append("phone", phone);
      formData.append("photo", photo);

      const res = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/users/update`, formData, {
        withCredentials: true,
      });

      if (res?.data?.success) {
        toast.success(res?.data?.message);
        dispatch(setUser(res?.data));
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message);
    }finally{
      setIsLoading(false)
    }
  };
  return (
    <div>
      <form onSubmit={submitHandler}>
        <div className="space-y-2">
          <div
            className="flex justify-end cursor-pointer"
            onClick={() => setOpenPopup(false)}
          >
            <img src={assets.remove} alt="" className="w-6 h-6" />
          </div>
          <div className="">
            <p className="text-gray-600 mb-1">Name</p>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              placeholder="Name"
              className="w-full py-2 px-3 border border-gray-300 outline-none rounded-md"
            />
          </div>

          <div>
            <p className="text-gray-600 mb-1">Email</p>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Email"
              className="w-full py-2 px-3 border border-gray-300 outline-none rounded-md"
            />
          </div>
          <div>
            <p className="text-gray-600 mb-1">Password</p>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Password"
              className="w-full py-2 px-3 border border-gray-300 outline-none rounded-md"
            />
          </div>
          <div className="flex justify-between items-center gap-4">
            <div className="flex flex-col">
              <p className="text-gray-600 mb-1">Role</p>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="border rounded px-2 py-1 border-gray-300"
              >
                <option value=""></option>
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            <input
              type="file"
              className="border rounded px-2 py-1  w-48 border-gray-300"
              onChange={(e) => setPhoto(e.target.files[0])}
            />
          </div>

          <div>
            <p className="text-gray-600 mb-1">Phone Number</p>
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              type="number"
              placeholder="Enter your number"
              className="w-full py-2 px-3 border border-gray-300 outline-none rounded-md"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-green-400 rounded-md mt-3 text-white"
          >
           {isLoading ? "Loading...":" Update"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProfile;

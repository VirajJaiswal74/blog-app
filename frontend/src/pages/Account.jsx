import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/userSlice";

const Account = () => {
  const [login, setLogin] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [photo, setPhoto] = useState("");
  const [phone, setPhone] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      if (login) {
        const res = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/api/users/login`,
          { email, password, role },
          { withCredentials: true }
        );
        if (res?.data?.success) {
          dispatch(setUser(res?.data));
          toast.success(res?.data?.message);
        }
      } else {
        const formData = new FormData();
        formData.append("name", name);
        formData.append("email", email);
        formData.append("password", password);
        formData.append("role", role);
        formData.append("photo", photo);
        formData.append("phone", phone);

        const res = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/api/users/register`,
          formData,
          { withCredentials: true }
        );
        if (res?.data?.success) {
          dispatch(setUser(res?.data));
          toast.success(res?.data?.message);
        }
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={submitHandler}>
      <div className="w-screen h-screen flex items-center justify-center">
        <div className="w-[25%] bg-white shadow-xl rounded-xl p-8 space-y-3">
          {!login && (
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
          )}
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
                {/* <option value=""></option> */}
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            {!login && (
              <input
                type="file"
                className="border rounded px-2 py-1  w-48 border-gray-300"
                onChange={(e) => setPhoto(e.target.files[0])}
              />
            )}
          </div>
          {!login && (
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
          )}
          {isLoading ? (
            <button className="w-full py-2 bg-green-400 rounded-md mt-3 text-white">
              Loading...
            </button>
          ) : (
            <button
              type="submit"
              className="w-full py-2 bg-green-400 rounded-md mt-3 text-white"
            >
              {login ? "Login" : "Submit"}
            </button>
          )}
          <div className="text-sm mt-3 text-gray-400">
            {login ? "Not have an account" : "Already have an Account"}
            <span
              className="text-sm text-blue-500 cursor-pointer"
              onClick={() => setLogin(!login)}
            >
              {login ? "Signup here" : "Login here"}
            </span>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Account;

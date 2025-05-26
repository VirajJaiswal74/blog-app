import { assets } from "../../assets/assets";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { setUser } from "@/redux/userSlice";
import EditProfile from "@/components/user/EditProfile";

const Navbar = () => {
  const [openPopup, setOpenPopup] = useState(false);
  const userData = useSelector((store) => store?.user?.user);

  const [showDropDown, setShowDropDown] = useState(false);

  const dispatch = useDispatch();

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/users/logout`);

      if (res?.data?.success) {
        toast.success(res?.data?.message);
        dispatch(setUser(null));
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message);
    }
  };
  return (
    <div className="flex justify-between items-center max-w-7xl mx-auto py-4">
      <div>
        <img src={assets?.blog} alt="" className="w-8 h-8" />
      </div>
      <div>
        <ul className="flex gap-8 text-gray-600">
          <NavLink to="/">
            <li>Home</li>
          </NavLink>
          <NavLink to="/all-blogs">
            <li>Blogs</li>
          </NavLink>
        </ul>
      </div>
      <div className="">
        {userData?.user?.photo ? (
          <Avatar onClick={() => setShowDropDown(!showDropDown)}>
            <AvatarImage src={userData?.user?.photo} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        ) : (
          <button className="py-2 px-3 text-white bg-green-600 hover:bg-green-700 rounded-full text-sm">
            Create Account
          </button>
        )}

        <div className="">
          {showDropDown && (
            <>
              <div className="absolute ransition-all duration-200 ease-in-out bg-white shadow-xl rounded-md border border-gray-200 ml-[-6vw] mt-2 z-10">
                <div className="p-4 space-y-2">
                  <p
                    onClick={() => setOpenPopup(!openPopup)}
                    className="border border-gray-200 rounded-md shadow-md px-2 py-1 cursor-pointer"
                  >
                    Edit Profile
                  </p>
                  <p
                    className="border border-gray-200 rounded-md shadow-md px-2 py-1 cursor-pointer"
                    onClick={handleLogout}
                  >
                    Logout
                  </p>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
     {openPopup && (
  <div className="fixed inset-0 z-50 flex items-center justify-center  bg-opacity-50">
    <div className="w-[90%] md:w-[40%] lg:w-[25%] bg-white shadow-xl rounded-md p-6">
      <EditProfile setOpenPopup={setOpenPopup}/>
    </div>
  </div>
)}

    </div>
  );
};

export default Navbar;

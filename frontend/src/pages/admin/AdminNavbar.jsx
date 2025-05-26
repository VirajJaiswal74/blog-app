import { assets } from "@/assets/assets";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { setUser } from "@/redux/userSlice";
import { AvatarImage } from "@radix-ui/react-avatar";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";

const AdminNavbar = ({ user }) => {
  const [showOpen, setShowOpen] = useState(false);
  const dispatch = useDispatch();
  console.log(import.meta.env.VITE_BACKEND_URL)

  const handleLogout = async () => {
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
    <div className="flex justify-between items-center py-2 px-12 border-b-2 border-gray-300 ">
      <div>
        <img src={assets.blog} alt="" className="w-8 h-8" />
      </div>

      <div>
        {user?.user?.photo ? (
          <Avatar onClick={()=>setShowOpen(!showOpen)}>
            <AvatarImage src={user?.user?.photo} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        ) : (
          <button className="bg-green-400 text-white text-sm py-2 px-4 rounded-full">
            Create Account
          </button>
        )}
       <div>
         {showOpen && (
          <>
            <div className="absolute ransition-all duration-200 ease-in-out bg-white shadow-xl rounded-md border border-gray-200 ml-[-6vw] mt-2 z-10">
              <div className="p-4 space-y-2">
                <p className="border border-gray-200 rounded-md shadow-md px-2 py-1 cursor-pointer">
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
    </div>
  );
};

export default AdminNavbar;

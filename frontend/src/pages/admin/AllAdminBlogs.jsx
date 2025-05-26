import axios from "axios";
import React, { useEffect} from "react";
import toast from "react-hot-toast";
import { setPost } from "@/redux/postSlice";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const AllAdminBlogs = () => {
  const dispatch = useDispatch();

  const postData = useSelector((store) => store?.allpost?.post);
  console.log(postData);
  const myBlogs = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/posts/getById`, {
        withCredentials: true,
      });

      if (res?.data?.success) {
        toast.success(res?.data?.message);
        dispatch(setPost(res?.data));
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message);
    }
  };

  useEffect(() => {
    myBlogs();
  }, []);
  return (
    <div className="p-8">
      <div className="grid grid-cols-4 gap-8 ">
       
        {Array.isArray(postData?.post) &&
          postData.post.map((item, index) => (
            <NavLink key={item?._id} to={`/${item?._id}`}>
              <div>
                <div className="rounded-md shadow-xl scale-100 hover:scale-110 transition-all duration-300 ease-in-out p-4 border">
                  <img src={item?.image} alt="" className="rounded-md h-40" />
                  <p className="font-semibold text-[18px] my-4 line-clamp-1">
                    {item.title}
                  </p>
                  <p className="line-clamp-5 text-gray-600 text-sm">
                    {item.description}
                  </p>
                </div>
              </div>
            </NavLink>
          ))}
      </div>
    </div>
  );
};

export default AllAdminBlogs;

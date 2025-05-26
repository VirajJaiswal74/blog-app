import axios from "axios";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "@/redux/postSlice";
import { NavLink } from "react-router-dom";

const AllBlogs = () => {
  const dispatch = useDispatch();
  const postsData = useSelector((store) => store?.allpost?.posts);
  console.log(postsData);
  const handleBlogs = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/posts/get`, {
        withCredentials: true,
      });
      if (res?.data?.success) {
        toast.success(res?.data?.message);
        dispatch(setPosts(res?.data));
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message);
    }
  };

  useEffect(() => {
    handleBlogs();
  }, []);
  return (
    <div className="max-w-7xl mx-auto my-10">
      <div className="grid grid-cols-4 gap-8 ">
        {postsData?.post?.map((item, index) => (
          <NavLink to={`/${item._id}`}>
            <div key={item?._id}>
              <div className=" rounded-md shadow-xl scale-100 hover:scale-110 transition-all duration-300 ease-in-out p-4 border">
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

export default AllBlogs;

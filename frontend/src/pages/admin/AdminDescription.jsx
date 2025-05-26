import UpdateBlog from "@/components/admin/UpdateBlog";
import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";

const AdminDescription = ({ item }) => {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  console.log(item);

  const handleDelete = async () => {
    try {
      setIsLoading(true);
      const res = await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/posts/delete/${item?._id}`,
        {
          withCredentials: true,
        }
      );
      console.log(res);
      if (res?.data?.success) {
        toast.success(res?.data?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="p-12 w-full">
        <div>
          {open ? (
            <div className="fixed w-full h-full justify-center flex">
              <div className="fixed ">
                <UpdateBlog setOpen={setOpen} item={item} />
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
        <div className="rounded-md w-full shadow-xl p-4 border">
          <div className="flex justify-between items-start">
            <img src={item?.image} alt="" className="rounded-md h-50" />
            <div className="flex flex-col gap-2">
              <button
                className="text-xs bg-green-500 shadow-xl px-8 py-3 rounded-sm text-white"
                onClick={() => setOpen(!open)}
              >
                {open ? "Close" : "Edit"}
              </button>
              <button
                className="text-xs bg-red-500 shadow-xl px-8 py-3 rounded-sm text-white"
                onClick={handleDelete}
              >
                {isLoading ? "Loading..." : "Delete"}
              </button>
            </div>
          </div>
          <p className="font-semibold text-2xl my-8">{item?.title}</p>
          <p className="text-gray-600 w-[90%]">{item?.description}</p>
        </div>
      </div>
    </>
  );
};

export default AdminDescription;

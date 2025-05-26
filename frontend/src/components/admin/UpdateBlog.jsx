import { assets } from "@/assets/assets";
import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setPost } from "@/redux/postSlice";
import { useNavigate } from "react-router-dom";

const UpdateBlog = ({ setOpen, item }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
      setImage(file);
    }
  };

  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("image", image);
    formData.append("title", title);
    formData.append("description", description);

    try {
      setIsLoading(true);
      const res = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/posts/update/${item._id}`,
        formData,
        { withCredentials: true }
      );

      if (res?.data?.success) {
        toast.success(res?.data?.message);
        dispatch(setPost(res?.data))
        navigate("/all-admin-blogs")
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-2xl p-6">
      <form onSubmit={submitHandler}>
        <div className="flex justify-between">
          <div className="w-[47%]">
            <div>
              <label htmlFor="img">
                <div className="cursor-pointer w-60 h-30 rounded-md shadow-lg flex items-center justify-center">
                  <img
                    src={selectedImage || assets.publication}
                    alt="Selected blog"
                    className={`w-24 cursor-pointer ${
                      selectedImage ? "w-full h-full" : "w-24"
                    }`}
                  />
                  <input
                    id="img"
                    type="file"
                    hidden
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </div>
              </label>
            </div>
            <div className="text-end">
              <button
                className=" text-white text-sm bg-red-500 rounded-md py-2 px-4 my-4 shadow-xl cursor-pointer"
                onClick={() => setSelectedImage(null)}
              >
                Remove
              </button>
            </div>
          </div>
          <img
            src={assets.remove}
            alt=""
            className="w-8 h-8"
            onClick={() => setOpen(false)}
          />
        </div>
        <div className="space-y-4">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Write Blog Title"
            className="w-full border border-gray-300 outline-none py-2 px-4 rounded-md"
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Write a content"
            className="w-full h-40 border border-gray-300 outline-none px-4 py-2 rounded-md"
          />
          <button
            type="submit"
            className="bg-green-600 text-white py-2 px-4 text-sm rounded-md shadow-xl cursor-pointer"
          >
            {isLoading ? "Loading..." : " Update Blog"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateBlog;

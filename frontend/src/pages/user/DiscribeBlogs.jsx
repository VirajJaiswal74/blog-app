import React from "react";

const DiscribeBlogs = ({ item }) => {
  return (
    <div className="max-w-7xl mx-auto my-10">
      <div className="rounded-md shadow-xl p-8 border">
        <img src={item?.image} alt="" className="rounded-md h-50"/>
        <p className="font-semibold text-2xl my-8">{item?.title}</p>
        <p className="text-gray-600 w-[90%]">{item?.description}</p>
      </div>
    </div>
  );
};

export default DiscribeBlogs;

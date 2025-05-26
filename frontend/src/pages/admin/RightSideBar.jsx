import React from "react";
import { NavLink } from "react-router-dom";

const RightSideBar = () => {
  return (
    <div className=" pt-8">
      <div className="">
        <NavLink to="/create-blogs">
          {({ isActive }) => (
            <p
              className={`border border-gray-300 py-2 px-3 mb-4 ${
                isActive ? "bg-green-400 text-white" : "hover:bg-gray-100"
              }`}
            >
              Create Blogs
            </p>
          )}
        </NavLink>
        <NavLink to="/all-admin-blogs">
          {({ isActive }) => (
            <p
              className={`border border-gray-300 py-2 px-3  ${
                isActive ? "bg-green-400 text-white" : "hover:bg-gray-100"
              }`}
            >
              My Blogs
            </p>
          )}
        </NavLink>
      </div>
    </div>
  );
};

export default RightSideBar;

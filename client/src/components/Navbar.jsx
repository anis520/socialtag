import React, { useState } from "react";
import Logo from "./Logo";
import {
  MdAccountCircle,
  MdHome,
  MdLogout,
  MdManageAccounts,
  MdMessage,
  MdNotifications,
  MdPeople,
} from "react-icons/md";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userLogout } from "../features/Auth/authapiSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { pathname } = useLocation();
  const handleLogout = () => {
    dispatch(userLogout());
  };
  console.log(pathname);
  return (
    <>
      <div className="shadow-sm p-5 bg-white flex justify-between  fixed top-0 left-0 w-full z-20">
        <Logo />
        <input
          type="search"
          placeholder="Search here"
          className="bg-slate-100 p-2 rounded-md text-slate-700 font-semibold w-5/12 ms-2 md:ms-0  text-sm md:text-lg"
          name=""
          id=""
        />

        {/* destop menu  */}
        <div
          className={` hidden   bg-white w-7/12 border md:w-auto md:border-none  h-screen md:h-auto    md:flex md:items-center md:gap-5 md:px-3 `}
        >
          <Link to={"/"}>
            <MdHome
              className={`bg-gray-200 text-gray-700   h-10 w-10 p-1 rounded-full ${
                pathname == "/" && "bg-teal-100 text-primaryText  "
              } `}
            />
          </Link>
          <MdPeople className="bg-gray-200 text-gray-700  h-10 w-10 p-1 rounded-full " />
          <MdMessage className="bg-gray-200 text-gray-700 h-10 w-10 p-1 rounded-full " />
          <MdNotifications className=" h-10 w-10 p-1 rounded-full " />
          <Link to={`/profile/${user._id}`}>
            <MdAccountCircle
              className={`bg-gray-200 text-gray-700   h-10 w-10 p-1 rounded-full ${
                pathname == `/profile/${user._id}` &&
                "bg-teal-100 text-primaryText  "
              } `}
            />
          </Link>
        </div>

        {/* mobile menu  */}
        <div
          className={` md:hidden  fixed bottom-0  left-0    bg-white w-full      flex items-center justify-between gap-5 p-3  border-t-2 border-primaryBg rounded-t-2xl`}
        >
          <Link to="/">
            <MdHome
              className={`bg-gray-200 text-gray-700   h-10 w-10 p-1 rounded-full ${
                pathname == "/" && "bg-teal-100 text-primaryText  "
              } `}
            />
          </Link>
          <MdPeople className="bg-gray-200 text-gray-700  h-10 w-10 p-1 rounded-full " />
          <MdMessage className="bg-gray-200 text-gray-700  h-10 w-10 p-1 rounded-full " />
          <MdNotifications className="bg-gray-200 text-gray-700  h-10 w-10 p-1 rounded-full " />
          <Link to={`/profile/${user._id}`}>
            <MdAccountCircle
              className={`bg-gray-200 text-gray-700   h-10 w-10 p-1 rounded-full ${
                pathname == "/profile" && "bg-teal-100 text-primaryText  "
              } `}
            />
          </Link>
          <Link to="/login">
            <MdLogout
              onClick={handleLogout}
              className="bg-gray-200 text-gray-700  h-10 w-10 p-1 rounded-full "
            />
          </Link>
        </div>
      </div>
    </>
  );
};

export default Navbar;

import React from "react";
import loginImg from "../../assets/image/login.png";
import Logo from "../../components/Logo";
import { FcGoogle } from "react-icons/fc";

import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { setMessageEmpty } from "../../features/Auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "../../features/Auth/authapiSlice";
import { toast } from "react-toastify";
import userFromField from "../../hook/userFormField";
export const Login = () => {
  const auth = useSelector((state) => state.auth);
  const navagte = useNavigate();
  const { input, handleInputChange, resetForm, setinput } = userFromField({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();

  const handleLogin = () => {
    if (!input.email || !input.password) {
      toast.warn("All fields are required");
    }
    dispatch(userLogin(input));

    // CreateTost("Login success");
  };

  useEffect(() => {
    // if (auth.user) {
    // }
    if (auth.error) {
      toast.error(auth.error);
      dispatch(setMessageEmpty());
    }
    if (auth.message) {
      toast.success(auth.message);
      navagte("/");
      dispatch(setMessageEmpty());
    }
  }, [auth.error, auth.message, auth.user]);
  return (
    <>
      <div className="grid md:grid-cols-2 ">
        <div className="p-5 ">
          <Logo />
          <img
            src={loginImg}
            alt="loging img"
            className="w-9/12 mx-auto md:ms-auto mt-10"
          />
        </div>
        <div className="w-10/12 md:w-8/12 mx-auto md:mx-0">
          <div className="p-5 md:mt-10 ">
            <p className="text-2xl font-semibold md:mt-10  md:text-3xl mb-4">
              Login into your account
            </p>
            <p className="text-secondaryText font-semibold">Email</p>
            <input
              name="email"
              value={input.email}
              onChange={handleInputChange}
              type="text"
              className="border w-full p-2 rounded-md text-lg focus:outline-none text-gray-700 font-semibold"
            />
            <p className="text-secondaryText md:mt-4 mt-2 font-semibold">
              Password
            </p>
            <input
              name="password"
              value={input.password}
              onChange={handleInputChange}
              type="password"
              className="border w-full p-2 rounded-md text-lg focus:outline-none text-gray-700 font-semibold"
            />

            <p
              onClick={handleLogin}
              className="bg-gray-700 text-white font-semibold text-xl text-center rounded-md py-2 mt-2 cursor-pointer"
            >
              Login
            </p>
            <Link to={"/register"}>
              <p className="text-primaryBg cursor-pointer font-semibold text-center mt-3">
                Create an account ?
              </p>
            </Link>
            <p className="bg-blue-600 text-white font-semibold  rounded-md flex items-center gap-6  mt-2  cursor-pointer">
              <FcGoogle className="bg-white h-10 m-1 w-10 rounded-md" />
              Login with google
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

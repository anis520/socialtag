import React, { useEffect } from "react";
import RegisterImg from "../../assets/image/register.png";
import Logo from "../../components/Logo";
import { Link, redirect, useNavigate } from "react-router-dom";
import userFromField from "../../hook/userFormField";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { userRegister } from "../../features/Auth/authapiSlice";
import { setMessageEmpty } from "../../features/Auth/authSlice";
const Register = () => {
  const navagte = useNavigate();

  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const { input, handleInputChange, resetForm, setinput } = userFromField({
    username: "",
    email: "",
    password: "",
    conpassword: "",
  });

  const handleregester = (e) => {
    e.preventDefault();

    if (!input.username || !input.email || !input.password) {
      // CreateTost("read");
      toast.warn("All fields are required");
    } else {
      if (input.password == input.conpassword) {
        dispatch(
          userRegister({
            username: input.username,
            email: input.email,
            password: input.password,
          })
        );

        setinput({
          email: "",
          password: "",
          username: "",
          conpassword: "",
        });
      } else {
        toast.warn("Confrom password not matched");
      }
    }
  };

  useEffect(() => {
    if (auth.error) {
      toast.error(auth.error);
      dispatch(setMessageEmpty());
    }
    if (auth.message) {
      navagte("/login");
      toast.success(auth.message);
      dispatch(setMessageEmpty());
    }
  }, [auth.error, auth.message]);

  return (
    <>
      <div className="grid md:grid-cols-2 ">
        <div className="p-5 ">
          <Logo />
          <img
            src={RegisterImg}
            alt="loging img"
            className="w-9/12 mx-auto md:ms-auto mt-10"
          />
          <p className="text-secondaryText text-2xl font-semibold text-center mt-5 hidden md:block">
            Join us with a lot of happyness ...
          </p>
        </div>
        <div className="w-10/12 md:w-8/12 mx-auto md:mx-0">
          <div className="p-5 md:mt-10 ">
            <p className="text-2xl font-semibold md:mt-10  md:text-3xl mb-4">
              Create your account
            </p>
            <p className="text-secondaryText font-semibold">Username</p>
            <input
              name="username"
              value={input.username}
              onChange={handleInputChange}
              type="text"
              className="border w-full p-2 rounded-md text-lg focus:outline-none text-gray-700 font-semibold"
            />
            <p className="text-secondaryText md:mt-4 mt-2 font-semibold">
              Email
            </p>
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
            <p className="text-secondaryText md:mt-4 mt-2 font-semibold">
              Confrom password
            </p>
            <input
              name="conpassword"
              value={input.conpassword}
              onChange={handleInputChange}
              type="password"
              className="border w-full p-2 rounded-md text-lg focus:outline-none text-gray-700 font-semibold"
            />

            <p
              className="bg-gray-700 text-white font-semibold text-xl text-center rounded-md py-2 mt-2 cursor-pointer"
              onClick={handleregester}
            >
              Register
            </p>
            <Link to={"/login"}>
              <p className="text-primaryBg cursor-pointer font-semibold text-center mt-3">
                Have an account ?
              </p>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;

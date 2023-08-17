import React from "react";
import { MdContactless } from "react-icons/md";
import { Link } from "react-router-dom";
const Logo = () => {
  return (
    <>
      <Link to={"/"}>
        <p
          className="font-bold cursor-pointer text-primaryText   text-2xl   md:text-3xl flex gap-2 items-center justify-center w-48 
        bg-teal-50 border rounded-md"
        >
          SocialTag
          <MdContactless />
        </p>
      </Link>
    </>
  );
};

export default Logo;

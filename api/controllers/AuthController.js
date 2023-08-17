import User from "../models/User.js";
import JWT from "jsonwebtoken";
import asynchandler from "express-async-handler";
import bcrypt from "bcrypt";
import sendEmail, { resetpasswordtemplate } from "../utils/sendemai.js";

/**
 * @DESC loging user
 * @ROUTE /api/v1/login
 * @method POST
 * @access public
 */
export const UserLogin = asynchandler(async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);

  if (!email | !password) {
    res.json({ message: "all filsed" });
  }
  const user = await User.findOne({ email }).populate("follow");
  // res.status(200).json(user)

  if (user) {
    const passverify = await bcrypt.compare(password, user.password);

    if (!passverify) {
      res.status(404).json({ message: "password not match" });
    }

    const accessToken = JWT.sign(
      { _id: user._id, email: user.email },
      process.env.ACCESS_TOKEN,
      {
        expiresIn: "5d",
      }
    );
    const refreshToken = JWT.sign(
      { _id: user._id, email: user.email },
      process.env.REFRESH_TOKEN,
      {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN,
      }
    );

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.APP_ENV == "Development" ? false : true,
      maxAge: 1000 * 60 * 60 * 24 * 7,
      path: "/",
    });

    res.json({
      refreshToken,
      accessToken,
      user,
      message: "loging successfull",
    });
  } else {
    res.status(404).json({ message: "user not found" });
  }
});

/**
 * @DESC logout user
 * @ROUTE /api/v1/logout
 * @method GET
 * @access public
 */
export const UserLogout = asynchandler((req, res) => {
  res.clearCookie("accessToken");

  res.status(200).json({ message: "logout successfull" });
});

/**
 * @DESC loging user
 * @ROUTE /api/v1/me
 * @method GET
 * @access public
 */
export const meController = asynchandler(async (req, res) => {
  const Token = req.cookies.accessToken;
  if (!Token) {
    res.status(404).json({ message: "unauthoriged user" });
  } else {
    JWT.verify(Token, process.env.ACCESS_TOKEN, async (err, decoed) => {
      if (err) {
        return res.status(400).json({ message: "invatie token" });
      }

      const me = await User.findOne({ email: decoed.email })
        .select("-password")
        .populate("follow");

      res.status(200).json({ me });
    });
  }
});

/**
 * @DESC register user
 * @ROUTE /api/v1/register
 * @method POST
 * @access public
 */
export const UserRegister = asynchandler(async (req, res) => {
  // get data
  console.log(req.body);
  const { username, email, password } = req.body;

  console.log(username, email, password);
  //  // check validation
  //  if (!name || !password || !email || !role) {
  //    return res.status(400).json({ message: "All fields are required" });
  //  }

  // email existance
  const emailCheck = await User.findOne({ email });

  if (emailCheck) {
    return res.status(400).json({ message: "Email already exists" });
  }
  // hash password
  const hash = await bcrypt.hash(password, 10);

  // create new user data
  const user = await User.create({
    username,
    email,

    password: hash,
  });

  // check
  if (user) {
    return res.status(201).json({ message: "User created successful", user });
  } else {
    return res.status(400).json({ message: "Invalid user data" });
  }
});

/**
 * @DESC get users
 * @ROUTE /api/v1/users
 * @method POST
 * @access private
 */

export const getAlluser = asynchandler(async (req, res) => {
  const user = await User.find().populate("follow");

  if (!user) {
    return res.status(500).json({ message: "User not found" });
  }

  return res.status(200).json({ users: user });
});

/**
 * @DESC follow user
 * @ROUTE /api/v1/followuser
 * @method GET
 * @access private
 */
export const getFollowUserController = asynchandler(async (req, res) => {
  /// get data
  const { userId, followId } = req.body;

  // find user data
  const user = await User.findById(userId);

  if (user.follow.includes(followId)) {
    let follow = user.follow.filter((e) => e != followId);

    //update user
    const userUpdate = await User.findByIdAndUpdate(
      userId,
      { follow },
      { new: true }
    );
    console.log(follow);

    if (userUpdate) {
      return res
        .status(200)
        .json({ message: "Unfollow user", user: userUpdate });
    } else {
      return res.status(400).json({ message: "unfollow user failed" });
    }
  }

  let follow = user.follow;
  follow.push(followId);

  //update user
  const userUpdate = await User.findByIdAndUpdate(
    userId,
    { follow },
    { new: true }
  );
  console.log(userUpdate);

  if (userUpdate) {
    return res
      .status(200)
      .json({ message: "Now your friend", user: userUpdate });
  } else {
    return res.status(400).json({ message: "Follow user faile" });
  }
});

/**
 * @DESC follow user
 * @ROUTE /api/v1/userphoto
 * @method POST
 * @access private
 */
export const getUserPhotoController = asynchandler(async (req, res) => {
  /// get data
  const { type, id } = req.body;
  console.log(type, id, req.file);

  let userUpdate;
  //   //update
  if (type == "cover") {
    userUpdate = await User.findByIdAndUpdate(
      id,
      { cover: req.file.filename },
      { new: true }
    );
  } else {
    userUpdate = await User.findByIdAndUpdate(
      id,
      { photo: req.file.filename },
      { new: true }
    );
  }

  // if (user.follow.includes(followId)) {
  //   let follow = user.follow.filter((e) => e != followId);

  //   console.log(follow);

  if (userUpdate) {
    return res
      .status(200)
      .json({ message: "update  user photo", user: userUpdate });
  } else {
    return res.status(400).json({ message: "photo update failed" });
  }
  // }

  // let follow = user.follow;
  // follow.push(followId);

  // //update user
  // const userUpdate = await User.findByIdAndUpdate(
  //   userId,
  //   { follow },
  //   { new: true }
  // );
  // console.log(userUpdate);

  // if (userUpdate) {
  //   return res
  //     .status(200)
  //     .json({ message: "Now your friend", user: userUpdate });
  // } else {
  //   return res.status(400).json({ message: "Follow user faile" });
  // }
});

// /// verfiy reset password contorller
// export const UserResetPasswordverify = asynchandler(async (req, res) => {
//   const user = await User.findOne({ token: req.body.token });

//   // // check exits email
//   if (!user) {
//     return res.status(500).json({ message: "Bad request Try agein" });
//   }
//   const hash = await bcrypt.hash(req.body.password, 10);

//   const updatedDocument = await User.findOneAndUpdate(
//     { token: req.body.token }, // The query to find the document
//     { password: hash, token: "" }, // The new data to update the document with
//     { new: true } // Set {new: true} to return the updated document instead of the original one
//   );

//   if (!updatedDocument) {
//     return res.status(500).json({ message: "Something was wrong try again" });
//   }

//   res.status(200).json({
//     message: "password update successfully",
//   });
// });

// // get all users

// export const Getalluser = asynchandler(async (req, res) => {
//   const users = await User.find({}, "username");

//   res.status(200).json({
//     users,
//   });
// });

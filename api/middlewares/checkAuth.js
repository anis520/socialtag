import JWT from "jsonwebtoken";
import path from "path";
import User from "../models/User.js";
import asychandler from "express-async-handler";
const AuthCheckmiddlewrer = asychandler(async (req, res, next) => {
  let Findid = "";

  const authHeader = req.cookies.accessToken;
  if (!authHeader) {
    return res.status(400).json({ message: "unauthorize" });
  }

  const token = authHeader;

  JWT.verify(token, process.env.ACCESS_TOKEN, (err, decoed) => {
    if (err) {
      return res.status(400).json({ message: "invatie token   " });
    }

    Findid = decoed._id;
  });
  const me = await User.findById(Findid);
  req.me = me;
  next();
});

export default AuthCheckmiddlewrer;

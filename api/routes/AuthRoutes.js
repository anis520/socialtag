import { Router } from "express";
import {
  UserLogin,
  UserLogout,
  meController,
  UserRegister,
  getAlluser,
  getFollowUserController,
  getUserPhotoController,
} from "../controllers/AuthController.js";
import { userPhotoMulter } from "../utils/multer.js";

const router = Router();

router.post("/login", UserLogin);

router.post("/register", UserRegister);
router.get("/logout", UserLogout);
router.get("/me", meController);
router.get("/users", getAlluser);
router.get("/users", getAlluser);
router.post("/followuser", getFollowUserController);
router.post("/userphoto", userPhotoMulter, getUserPhotoController);

export default router;

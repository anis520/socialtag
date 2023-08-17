import express from "express";
import AuthCheckmiddlewrer from "../middlewares/checkAuth.js";
import {
  createpostController,
  getallpostController,
  updatepostController,
} from "../controllers/postController.js";
import { postMulter } from "../utils/multer.js";

/// router
const router = express.Router();

///

router.get("/post", AuthCheckmiddlewrer, getallpostController);
router.post("/post", AuthCheckmiddlewrer, postMulter, createpostController);
router.put("/post", AuthCheckmiddlewrer, updatepostController);

export default router;

import express from "express";
import {
  createPost,
  deletePost,
  getAllPost,
  getPostByUserId,
  updatePost,
} from "../controllers/post.controller.js";
import { upload } from "../middlewares/multer.js";
import { isAuthenticate } from "../middlewares/isAuthenticated.js";

export const postRoute = express.Router();

postRoute.post("/create", isAuthenticate, upload.single("image"), createPost);
postRoute.get("/get", isAuthenticate, getAllPost);
postRoute.get("/getById", isAuthenticate, getPostByUserId);
postRoute.put(
  "/update/:postId",
  isAuthenticate,
  upload.single("image"),
  updatePost
);
postRoute.delete("/delete/:postId", isAuthenticate, deletePost);

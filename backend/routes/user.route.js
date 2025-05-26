import express from "express";
import {
  login,
  logout,
  register,
  update,
} from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.js";
import { isAuthenticate } from "../middlewares/isAuthenticated.js";

export const userRoute = express.Router();

userRoute.post("/register", upload.single("photo"), register);
userRoute.post("/login", login);
userRoute.get("/logout", logout);
userRoute.put("/update", upload.single("photo"), isAuthenticate, update);

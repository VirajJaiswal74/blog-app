import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import cloudinary from "../utils/cloudinary.js";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const { name, email, password, role, phone } = req.body;
    const photo = req.file;

    if (!name || !email || !password || !role || !phone || !photo) {
      return res.status(404).json({
        message: "All fields are required",
        success: false,
      });
    }

    // check email exist or not
    const checkEmail = await User.findOne({ email });
    if (checkEmail) {
      return res.status(400).json({
        message: "User already exist",
        success: false,
      });
    }

    // check phonenumber exist or not
    const checkPhone = await User.findOne({ phone });
    if (checkPhone) {
      return res.status(400).json({
        message: "Phone number already exist",
        success: false,
      });
    }

    // hashed password
    const hashedPassword = await bcrypt.hash(password, 10);

    // upload a image
    const cloudinaryResponse = await cloudinary.uploader.upload(photo.path, {
      resourse_type: "image",
    });

    const newUser = await new User({
      name,
      email,
      password: hashedPassword,
      role,
      phone,
      photo: cloudinaryResponse.secure_url,
    });

    await newUser.save();

    const tokenData = {
      userId: newUser._id,
    };

    const token = await jwt.sign(tokenData, process.env.JWT_SECRET_KEY, {
      expiresIn: "7d",
    });
    return res
      .status(201)
      .cookie("token", token, {
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        secure: true,
        sameSite: "None",
      })
      .json({
        message: "user register successfully",
        success: true,
        user: newUser,
      });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    if (!email || !password || !role) {
      return res.status(404).json({
        message: "All fields are required",
        success: false,
      });
    }

    // check email exist
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "Invailid credentials",
        success: false,
      });
    }

    if (role !== user.role) {
      return res.status(403).json({
        message: "Unauthorized role",
        success: false,
      });
    }

    // comparepassword
    const matchPassword = await bcrypt.compare(password, user.password);
    if (!matchPassword) {
      return res.status(400).json({
        message: "Invailid credentials",
        success: false,
      });
    }

    const tokenData = {
      userId: user._id,
    };

    const token = await jwt.sign(tokenData, process.env.JWT_SECRET_KEY, {
      expiresIn: "7d",
    });

    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        secure: true,
        sameSite: "None",
      })
      .json({
        message: "user logged in successfully",
        success: true,
        user,
      });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

export const logout = async (req, res) => {
  try {
    return res.status(200).cookie("token", " ", { maxAge: 0 }).json({
      message: "user logout successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

export const update = async (req, res) => {
  try {
    const userId = req.id;
    const { name, email, password, role, phone } = req.body;
    const photo = req.file;
    if (!userId) {
      return res.status(404).json({
        message: "User is not authenticat",
        success: false,
      });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        message: "User not exist",
        success: false,
      });
    }

    // check email
    // check phone

    // hashed password
    let hashedPassword = user?.password;
    if (password) {
      hashedPassword = await bcrypt.hash(password, 10);
    }

    // update photo
    let photoUrl = user?.photo;
    if (photo?.path) {
      const cloudinaryResponse = await cloudinary.uploader.upload(photo?.path, {
        resource_type: "image",
      });
      photoUrl = cloudinaryResponse.secure_url;
    }

    const updateUser = await User.findByIdAndUpdate(
      userId,
      {
        name: name || user.name,
        email: email || user.email,
        password: hashedPassword,
        role: role || user.role,
        phone: phone || user.phone,
        photo: photoUrl,
      },
      { new: true }
    );

    return res.status(201).json({
      message: "Updated Successfully",
      success: true,
      user: updateUser,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

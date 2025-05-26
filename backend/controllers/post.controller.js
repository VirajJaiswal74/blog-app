import { Post } from "../models/post.model.js";
import { User } from "../models/user.model.js";
import cloudinary from "../utils/cloudinary.js";

export const createPost = async (req, res) => {
  try {
    const userId = req.id;
    if (!userId) {
      return res.status(400).json({
        message: "User is not authenticated",
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

    const { title, description } = req.body;
    const image = req.file;

    if (!title || !description || !image) {
      return res.status(404).json({
        message: "All fields are required",
        success: false,
      });
    }

    if (description.length < 100) {
      return res.status(400).json({
        message: "Description must be provide atleast 100 character",
        success: false,
      });
    }

    // upload image on cloudinary
    const cloudinaryResponse = await cloudinary.uploader.upload(image.path, {
      resource_type: "image",
    });

    const post = new Post({
      title,
      description,
      image: cloudinaryResponse.secure_url,
      userId,
    });

    await post.save();

    return res.status(201).json({
      message: "Post created successfully",
      success: true,
      post,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      messsage: "Internal server error",
      success: false,
    });
  }
};

export const getAllPost = async (req, res) => {
  try {
    const post = await Post.find({}).populate("userId");
    if (post.length === 0) {
      return res.status(404).json({
        message: "Not found Post ",
        success: false,
      });
    }
    return res.status(200).json({
      message: "Get all post here",
      success: true,
      post,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      messsage: "Internal server error",
      success: false,
    });
  }
};

export const getPostByUserId = async (req, res) => {
  try {
    const userId = req.id;
    if (!userId) {
      return res.status(400).json({
        message: "User is not authenticated",
        success: false,
      });
    }

    const post = await Post.find({ userId }).populate("userId"); //findOne return only one

    return res.status(200).json({
      message: "Your all post here",
      success: true,
      post,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      messsage: "Internal server error",
      success: false,
    });
  }
};

export const updatePost = async (req, res) => {
  try {
    const postId = req?.params?.postId;

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({
        message: "Post not found",
        success: false,
      });
    }

    const { title, description } = req?.body;
    const image = req?.file;

    let imageUrl = post?.image;
    if (image?.path) {
      const cloudinaryResponse = await cloudinary?.uploader?.upload(
        image?.path,
        {
          resource_type: "image",
        }
      );
      imageUrl = cloudinaryResponse?.secure_url;
    }

    const newPost = await Post.findByIdAndUpdate(
      postId,
      {
        image: imageUrl,
        title: title || post.title,
        description: description || post.description,
      },
      { new: true }
    ).populate("userId");

    return res.status(201).json({
      message: "new post created successfully",
      success: true,
      post: newPost,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      messsage: "Internal server error",
      success: false,
    });
  }
};

export const deletePost = async (req, res) => {
  try {
    const postId = req?.params?.postId;

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({
        message: "Post not found",
        success: false,
      });
    }

    const delPost = await Post.findByIdAndDelete(postId);

    return res.status(200).json({
      message: "Post deleted successfully",
      success: true,
      delPost,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      messsage: "Internal server error",
      success: false,
    });
  }
};

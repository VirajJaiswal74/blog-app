import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["user", "admin"], required: true },
    phone: { type: Number, required: true , unique:true},
    photo: { type: String, required: true },
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);

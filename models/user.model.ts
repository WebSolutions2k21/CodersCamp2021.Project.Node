import User from "../interfaces/user.interface";

import mongoose from "mongoose";

const userSchema = new mongoose.Schema<User>({
  name: {
    type: String,
    required: true,
    min: 6,
    max: 255,
  },
  email: {
    type: String,
    required: true,
    min: 6,
    max: 255,
  },
  password: {
    type: String,
    required: true,
    min: 6,
    max: 255,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const userModel = mongoose.model<User & mongoose.Document>("User", userSchema);

export default userModel;
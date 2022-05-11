import mongoose from "mongoose";
import jwt from "jsonwebtoken";

import User from "../interfaces/user.interface";

const Schema = mongoose.Schema;
const userSchema = new Schema<User>({
  username: {
    type: String,
    required: true,
    maxlength: 50,
    minlength: 2,
  },
  firstname: {
    type: String,
    maxlength: 100,
  },
  lastname: {
    type: String,
    maxlength: 100,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    maxlength: 250,
    minlength: 5,
  },
  password: {
    type: String,
    required: true,
    maxlength: 500,
    minlength: 8,
  },
  // nie ma potrzeby przechowywania w bazie confirm password
  confirmpassword: {
    type: String,
    required: true,
    maxlength: 500,
    minlength: 8,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  programmingLanguage: [
    {
      langId: {
        type: mongoose.Schema.Types.ObjectId,
      },
      nameLang: {
        type: String,
      },
      level: {
        type: String,
      },
    },
  ],
  isMentor: {
    type: Boolean,
    default: false,
  },
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id, username: this.username }, process.env.JWT_PRIVATE_KEY as string);
  return token;
};

const userModel = mongoose.model<User & mongoose.Document>("User", userSchema);

export default userModel;

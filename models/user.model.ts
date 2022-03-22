import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import config from "config";

import User from "../interfaces/user.interface";

const Schema = mongoose.Schema;
const userSchema = new Schema<User>({
	name: {
		type: String,
		required: true,
		maxlength: 50,
		minlength: 2,
	},
	firstname: {
		type: String,
		maxlength: 100,
		minlength: 2,
	},
	lastname: {
		type: String,
		maxlength: 100,
		minlength: 2,
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
	isVerified: {
    type: Boolean,
    default: false,
  },
	date: {
		type: Date,
		default: Date.now,
	  },
});

userSchema.methods.generateAuthToken = function () {
	const token = jwt.sign(
		{ _id: this._id, name: this.name },
		config.get("jwtPrivateKey")
	);
	return token;
};

const userModel = mongoose.model<User & mongoose.Document>("User", userSchema);

export default userModel;

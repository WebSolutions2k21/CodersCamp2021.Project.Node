import mongoose from "mongoose";

const Schema = mongoose.Schema;
const userSchema: any = new Schema({
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
});

const userModel = mongoose.model("User", userSchema);
export default userModel;

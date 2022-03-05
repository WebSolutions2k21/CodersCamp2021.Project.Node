import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import config from "config";

import Team from "../interfaces/team.interface";

const Schema = mongoose.Schema;
const teamSchema = new Schema<Team>({
	teamname: {
		type: String,
		required: true,
		maxlength: 50,
		minlength: 2,
	},
    usersIds: [
        {
            id: {
              type: mongoose.Schema.Types.ObjectId,
            }
        }
    ],
    mentorId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    programmingLanguage: [
        {
          id: {
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
    status: {
        type: String,
        required: true,
    }
});

teamSchema.methods.generateAuthToken = function () {
	const token = jwt.sign(
		{ _id: this._id, teamname: this.teamname },
		config.get("jwtPrivateKey")
	);
	return token;
};

const teamModel = mongoose.model<Team & mongoose.Document>("Team", teamSchema);

export default teamModel;

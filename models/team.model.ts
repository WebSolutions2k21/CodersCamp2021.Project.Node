import mongoose from "mongoose";
import Team from "../interfaces/team.interface";

const Schema = mongoose.Schema;
const teamSchema = new Schema<Team>({
	teamName: {
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

const teamModel = mongoose.model<Team & mongoose.Document>("Team", teamSchema);

export default teamModel;

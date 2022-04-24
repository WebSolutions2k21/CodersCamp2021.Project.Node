import { number } from "joi";
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
      type: mongoose.Schema.Types.ObjectId,
    },
  ],
  mentorId: {
    type: mongoose.Schema.Types.ObjectId,
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
    default: true,
  },
  places: {
    type: Number,
    minvalue: 1,
    maxvalue: 10,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  description: {
    type: String,
    maxlength: 50,
  },
});

const teamModel = mongoose.model<Team & mongoose.Document>("Team", teamSchema);

export default teamModel;

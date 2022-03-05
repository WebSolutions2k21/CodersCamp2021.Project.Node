import mongoose from "mongoose";
import Opinion from "../interfaces/opinion.interface";

const userSchema = new mongoose.Schema<Opinion>({
  content: {
    type: String,
    required: true,
    maxlength: 500,
    minlength: 2,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  mentorId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  stars: {
    type: Number,
    minvalue: 1,
    maxvalue: 5,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const opinionModel = mongoose.model<Opinion & mongoose.Document>("Opinion", userSchema);

export default opinionModel;

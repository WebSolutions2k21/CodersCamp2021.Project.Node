import mongoose, { Schema, Document } from "mongoose";
import { IOpinion } from "../interfaces/opinion.interface";

const opinionSchema = new Schema<IOpinion>({
  content: {
    type: String,
    required: true,
    maxlength: 500,
    minlength: 2,
  },
  username: {
    type: String,
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  mentorId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  stars: {
    type: Number,
    minvalue: 1,
    maxvalue: 5,
  },
});

export const opinionModel = mongoose.model<IOpinion & Document>("Opinion", opinionSchema);

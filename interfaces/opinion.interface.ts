import mongoose from "mongoose";

export interface IOpinion extends mongoose.Document {
  content: string;
  userId: string;
  username: string;
  mentorId: string;
  stars: number;
}

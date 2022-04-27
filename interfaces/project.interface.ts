import mongoose from "mongoose";

export interface IProject extends mongoose.Document {
  name: string;
  userId?: string;
  mentorId?: string;
  teamId?: string;
  content: string;
  status: string;
}

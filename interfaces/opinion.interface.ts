import mongoose from "mongoose";

interface Opinion extends mongoose.Document {
  date: Date;
  content: string;
  userId: string;
  mentorId: string;
  stars: number;
}

export default Opinion;

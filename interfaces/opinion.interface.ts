import mongoose from "mongoose";

interface Opinion extends mongoose.Document {
  date: Date;
  name: string;
  content: string;
  userId: string;
  mentorId: string;
  stars: number;
}

export default Opinion;
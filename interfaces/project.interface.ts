import mongoose from "mongoose";

interface Project extends mongoose.Document {
  name: string;
  userId: string;
  mentorId?: string;
  content: string;
}

export default Project;

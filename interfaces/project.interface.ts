import mongoose from "mongoose";

interface Project extends mongoose.Document {
  name: string;
  userId?: string;
  mentorId?: string;
  teamId?: string;
  content: string;
  status: string;
}

export default Project;

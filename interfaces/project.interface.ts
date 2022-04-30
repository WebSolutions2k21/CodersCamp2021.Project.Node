import mongoose from "mongoose";

import STATUS from "../enums/projectsStatus";

export interface IProject extends mongoose.Document {
  name: string;
  userId?: string;
  mentorId?: string;
  teamId?: string;
  content?: string;
  status?: STATUS;
  language?: string[];
  description?: string;
  isIndividual?: boolean;
}

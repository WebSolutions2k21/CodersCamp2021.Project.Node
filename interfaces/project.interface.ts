import mongoose from "mongoose";

import { PROJECT_STATUS } from "../enums/projectsStatus";

export interface IProject extends mongoose.Document {
  name: string;
  userId?: string;
  mentorId?: string;
  teamId?: string;
  content?: string;
  status?: PROJECT_STATUS;
  language?: string[];
  description?: string;
  isIndividual?: boolean;
}

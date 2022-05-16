import { Schema, Document, model } from "mongoose";

import { PROJECT_STATUS } from "../enums/projectsStatus";
import { IProject } from "../interfaces/project.interface";

const projectSchema = new Schema<IProject>({
  name: {
    type: String,
    minlength: 3,
    maxLength: 50,
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    default: null,
  },
  mentorId: {
    type: Schema.Types.ObjectId,
    default: null,
  },
  teamId: {
    type: Schema.Types.ObjectId,
    default: null,
  },
  content: {
    type: String,
    default: "",
  },
  status: {
    type: PROJECT_STATUS,
    default: PROJECT_STATUS.OPEN,
  },
  language: {
    type: [String],
    default: [""],
  },
  description: {
    type: String,
    default: "",
  },
  isIndividual: {
    type: Boolean,
    required: true,
  },
});

export const projectModel = model<IProject & Document>("Project", projectSchema);

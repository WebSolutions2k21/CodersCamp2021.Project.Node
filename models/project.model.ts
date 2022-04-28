import { boolean } from "joi";
import { Schema, Document, model } from "mongoose";

import { projectStatuses } from "../constants/constatns";
import { IProject } from "../interfaces/project.interface";

const projectSchema = new Schema<IProject>({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxLength: 50,
  },
  userId: {
    type: Schema.Types.ObjectId,
  },
  mentorId: {
    type: Schema.Types.ObjectId,
  },
  teamId: {
    type: Schema.Types.ObjectId,
  },
  content: {
    type: String,
  },
  status: {
    type: String,
    enum: projectStatuses,
    default: "open",
  },
  language: {
    type: [String],
  },
  description: {
    type: String,
  },
  isIndividual: {
    type: Boolean,
  },
});

export const projectModel = model<IProject & Document>("Project", projectSchema);

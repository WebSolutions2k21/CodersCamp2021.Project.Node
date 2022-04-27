import { Schema, Document, model } from "mongoose";
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
    required: false,
  },

  teamId: {
    type: Schema.Types.ObjectId,
    required: false,
  },

  content: {
    type: String,
    required: true,
    minlength: 3,
    maxLength: 255,
    default: null,
  },

  status: {
    type: String,
    enum: ["closed", "open"],
    minlength: 3,
    maxLength: 12,
  },
});

export const projectModel = model<IProject & Document>("Project", projectSchema);

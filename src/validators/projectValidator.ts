import Joi from "joi";
import {
  isJSDocOptionalType,
  isJSDocSignature,
  isJsxOpeningElement,
  parseJsonSourceFileConfigFileContent,
} from "typescript";
import Project from "../../interfaces/project.interface";

export default function validateProject(project: Project) {
  const schema = Joi.object({
    name: Joi.string().min(2).max(300),
    userId: Joi.string().min(24).max(24),
    mentorId: Joi.optional(),
    teamId: Joi.optional(),
    content: Joi.string().min(2).max(300),
    status: Joi.boolean(),
  });

  return schema.validate(project);
}

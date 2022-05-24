import { Response, Request } from "express";
import { StatusCodes } from "http-status-codes";
import teamModel from "../../models/team.model";
import userModel from "../../models/user.model";
import validateTeam from "./validateTeam";

export default async function createTeam(req: Request, res: Response) {
  const { error } = validateTeam(req.body);
  if (error)  res.status(StatusCodes.BAD_REQUEST).send(error.details[0].message);
  const mentor = await userModel.findById(req.body.mentorId);
  if (req.body.mentorId && (!mentor || !mentor.isMentor))
    return res.status(StatusCodes.NOT_FOUND).send("Mentor not found");

  let team = await teamModel.findOne({ teamName: req.body.teamName });
  if (team) {
    return res.status(StatusCodes.LOCKED).send("Team already exists");
  } else {
    team = new teamModel({
      teamName: req.body.teamName,
      usersIds: req.body.usersIds,
      mentorId: req.body.mentorId,
      programmingLanguage: req.body.programmingLanguage,
      status: req.body.status,
      places: req.body.places,
      description: req.body.description,
    });

    await team.save();
    res.send(team);
  }
}

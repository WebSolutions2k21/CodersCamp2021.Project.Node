import { Response, Request } from "express";
import { StatusCodes } from "http-status-codes";
import teamModel from "../../models/team.model";
import userModel from "../../models/user.model";

export default async function deleteTeam(req: Request, res: Response) {
  const team = await teamModel.findByIdAndDelete(req.params.id);
  if (!team) return res.status(StatusCodes.NOT_FOUND).send("Team not found");

  let user = await userModel.findById(req.userInfo._id);
  if (!user) return res.status(StatusCodes.NOT_FOUND).send("User not found");
  
  if (!user.isMentor)return res.status(StatusCodes.LOCKED).send("Only mentor could delete team");
  return res.status(StatusCodes.OK).send(`Team with id: ${req.params.id} has been deleted`);
}

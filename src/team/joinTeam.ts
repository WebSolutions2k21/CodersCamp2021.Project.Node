import { Response, Request } from "express";
import { StatusCodes } from "http-status-codes";
import teamModel from "../../models/team.model";
import userModel from "../../models/user.model";

export default async function joinTeam(req: Request, res: Response) {
  let team = await teamModel.findById(req.params.id);
  if (!team) return res.status(StatusCodes.NOT_FOUND).send("Team not found");

  let user = await userModel.findById(req.userInfo._id);
  if (!user) return res.status(StatusCodes.NOT_FOUND).send("User not found");

  if (user._id.toString() === team.mentorId.toString())
    return res.status(StatusCodes.METHOD_NOT_ALLOWED).send("As mentor you could not join your team");
  const getAllUsersAtTeam = team.usersIds;

  if (team.usersIds?.includes(user._id)) {
    return res.status(StatusCodes.LOCKED).send("You are already enrolled");
  }
  getAllUsersAtTeam?.push(user?._id);

  const setStatus = team.usersIds?.length === team.places ? (team.status = false) : (team.status = true);
  const addTeam = await teamModel.findByIdAndUpdate(
    req.params.id,
    {
      usersIds: getAllUsersAtTeam,
      status: setStatus,
    },
    { new: true },
  );

  return res.status(StatusCodes.OK).send(addTeam);
}

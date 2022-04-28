import { Response, Request } from "express";
import { StatusCodes } from "http-status-codes";
import teamModel from "../../models/team.model";

export default async function getTeam(req: Request, res: Response) {
  const team = await teamModel.findById(req.params.id);
  if (team === null) {
    res.status(404).send();
    return;
  }

  res.status(StatusCodes.OK).send(team);
}

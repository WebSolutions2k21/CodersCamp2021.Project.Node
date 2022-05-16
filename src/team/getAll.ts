import { Response, Request } from "express";
import { StatusCodes } from "http-status-codes";
import teamModel from "../../models/team.model";

export default async function getAll(req: Request, res: Response) {
  const teams = await teamModel.find().select("");

  const getOnlyOpenStatus = teams.filter((team) => team.status === true);

  res.status(StatusCodes.OK).send(getOnlyOpenStatus);
}

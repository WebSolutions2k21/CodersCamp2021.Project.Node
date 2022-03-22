import { Response, Request } from "express";
import { StatusCodes } from "http-status-codes";
import teamModel from '../../models/team.model'

export default async function editTeam (req: Request, res: Response) {
    let team = await teamModel.findById(req.params.id);
    if (!team) return res.status(StatusCodes.NOT_FOUND).send("Team not found");

    team = await teamModel.findByIdAndUpdate(req.params.id, {
      ...req.body,
    });

    return res.status(StatusCodes.OK).send(team);
}

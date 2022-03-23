import { Response, Request } from "express";
import { StatusCodes } from "http-status-codes";
import teamModel from '../../models/team.model'

export default async function deleteTeam (req: Request, res: Response) {
    const team = await teamModel.findByIdAndDelete(req.params.id);
    if (!team) return res.status(StatusCodes.NOT_FOUND).send("Team not found");

    return res.status(StatusCodes.OK).send(`Team with id: ${req.params.id} has been deleted`);
}
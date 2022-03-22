import { Response, Request } from "express";
import { StatusCodes } from "http-status-codes";
import teamModel from '../../models/team.model'

export default async function getAll(req: Request, res: Response) {
    console.log("getAll", req.body);
    const teams = await teamModel.find().select("");
    res.status(StatusCodes.OK).send(teams);
}
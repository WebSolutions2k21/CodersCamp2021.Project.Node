import { Response, Request } from "express";
import { StatusCodes } from "http-status-codes";
import _ from "lodash";

import opinionModel from "../../models/opinion.model";

const deleteOpinion = async (req: Request, res: Response) => {
    const opinion = await opinionModel.findByIdAndDelete(req.params.id);
    if (!opinion) return res.status(StatusCodes.NOT_FOUND).send("opinion not found");

    return res.status(StatusCodes.OK).send(opinion);
}

export default deleteOpinion
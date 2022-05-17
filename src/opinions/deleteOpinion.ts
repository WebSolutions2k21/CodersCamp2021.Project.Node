import { Response, Request } from "express";
import { StatusCodes } from "http-status-codes";

import { opinionModel } from "../../models/opinion.model";

const deleteOpinion = async (req: Request, res: Response) => {
  await opinionModel.findByIdAndDelete(req.params.opinionId);
  return res.status(StatusCodes.OK).send(`Opinion with id: ${req.params.opinionId} has been deleted`);
};

export default deleteOpinion;

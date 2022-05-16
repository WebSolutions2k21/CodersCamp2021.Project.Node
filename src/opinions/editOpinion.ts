import { Response, Request } from "express";
import { StatusCodes } from "http-status-codes";

import { opinionModel } from "../../models/opinion.model";

const editOpinion = async (req: Request, res: Response) => {
  let opinion = await opinionModel.findById(req.params.id);
  if (!opinion) return res.status(StatusCodes.NOT_FOUND).send("opinion not found");

  opinion = await opinionModel.findByIdAndUpdate(
    req.params.id,
    {
      ...req.body,
    },
    { new: true },
  );

  return res.status(StatusCodes.OK).send(opinion);
};

export default editOpinion;

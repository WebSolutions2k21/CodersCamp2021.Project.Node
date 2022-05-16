import { Response, Request } from "express";
import { StatusCodes } from "http-status-codes";

import { opinionModel } from "../../models/opinion.model";
import { validateOpinionEdit } from "./validateOpinionEdit";

const editOpinion = async (req: Request, res: Response) => {
  const { error } = validateOpinionEdit(req.body);
  if (error) return res.status(StatusCodes.BAD_REQUEST).send(error.details[0].message);

  const opinionUpdated = await opinionModel.findByIdAndUpdate(req.params.opinionId, { ...req.body }, { new: true });

  return res.status(StatusCodes.OK).send(opinionUpdated);
};

export default editOpinion;

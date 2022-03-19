import { Response, Request } from "express";
import { StatusCodes } from "http-status-codes";
import _ from "lodash";

import opinionModel from "../../models/opinion.model";

const getAllOpinions = async (req: Request, res: Response) => {
    const opinions = await opinionModel.find().select("-_id");
    res.status(StatusCodes.OK).send(opinions);
  };

  export default getAllOpinions
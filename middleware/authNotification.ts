import { StatusCodes } from "http-status-codes";
import { NextFunction, Request, Response } from "express";

import { INotification } from "../interfaces/notification.interface";

const authNotification = (req: Request, res: Response, next: NextFunction) => {
  const { _id: id } = req.userInfo;
  const { userId } = res.locals.notification as INotification;

  const userOK = userId?.toString() === id.toString();
  if (!userOK) return res.status(StatusCodes.FORBIDDEN).send(`You are not authorized to perform this operation`);

  next();
};

export default authNotification;

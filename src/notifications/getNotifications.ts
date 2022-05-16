import { Response, Request } from "express";
import { StatusCodes } from "http-status-codes";

import { notificationModel } from "../../models/notification.model";

const getNotifications = async (req: Request, res: Response) => {
  const notifications = await notificationModel.find({ userId: req.userInfo._id }).select("");
  res.status(StatusCodes.OK).send(notifications);
};

export default getNotifications;

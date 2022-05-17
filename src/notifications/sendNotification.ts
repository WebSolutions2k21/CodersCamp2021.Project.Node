import { Response, Request } from "express";
import { StatusCodes } from "http-status-codes";

import { validateNotification } from "./validateNotification";
import { notificationModel } from "../../models/notification.model";
import { INotification } from "../../interfaces/notification.interface";
import userModel from "../../models/user.model";
import { NOTIFICATION_STATUS } from "../../enums/notificationStatus";

const sendNotification = async (req: Request, res: Response) => {
  const { error } = validateNotification(req.body);
  if (error) return res.status(StatusCodes.BAD_REQUEST).send(error.details[0].message);

  const user = await userModel.findById(req.body.userId);
  if (!user) return res.status(StatusCodes.NOT_FOUND).send("User not found");

  const notificationData: INotification = { status: NOTIFICATION_STATUS.PENDING, ...req.body };
  const notification = new notificationModel(notificationData);
  await notification.save();

  res.status(StatusCodes.OK).send(notification);
};

export default sendNotification;

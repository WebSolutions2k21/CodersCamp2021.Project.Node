import { Response, Request } from "express";
import { StatusCodes } from "http-status-codes";

import { notificationModel } from "../../models/notification.model";

const deleteNotification = async (req: Request, res: Response) => {
  await notificationModel.findByIdAndDelete(req.params.notificationId);
  return res.status(StatusCodes.OK).send(`Notification with id: ${req.params.notificationId} has been deleted`);
};

export default deleteNotification;

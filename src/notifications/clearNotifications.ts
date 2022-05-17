import { Response, Request } from "express";
import { StatusCodes } from "http-status-codes";
import { NOTIFICATION_STATUS } from "../../enums/notificationStatus";

import { notificationModel } from "../../models/notification.model";

const clearNotifications = async (req: Request, res: Response) => {
  await notificationModel.updateMany({ userId: req.userInfo._id }, { status: NOTIFICATION_STATUS.READ });
  return res.status(StatusCodes.OK).send("notifications updated");
};

export default clearNotifications;

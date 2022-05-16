import { Response, Request } from "express";
import { StatusCodes } from "http-status-codes";
import { NOTIFICATION_STATUS } from "../../enums/notificationStatus";

import { notificationModel } from "../../models/notification.model";

const changeNotificationStatus = async (req: Request, res: Response) => {
  await notificationModel.updateOne({ _id: res.locals.notification._id }, { status: NOTIFICATION_STATUS.READ });
  return res.status(StatusCodes.OK).send("notification updated");
};

export default changeNotificationStatus;

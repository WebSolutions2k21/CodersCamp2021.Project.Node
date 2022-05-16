import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import { notificationModel } from "../models/notification.model";

const findNotification = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const notification = await notificationModel.findById(req.params.notificationId);
    if (!notification) throw new Error();

    res.locals.notification = notification;
    next();
  } catch (ex) {
    res.status(StatusCodes.NOT_FOUND).send("Notification not found");
  }
};

export default findNotification;

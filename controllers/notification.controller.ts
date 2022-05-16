import express, { Request, Response } from "express";

import auth from "../middleware/auth";
import authNotification from "../middleware/authNotification";
import findNotification from "../middleware/findNotification";
import changeNotificationStatus from "../src/notifications/changeNotificationStatus";
import clearNotifications from "../src/notifications/clearNotifications";
import deleteNotification from "../src/notifications/deleteNotification";

import getNotifications from "../src/notifications/getNotifications";
import sendNotification from "../src/notifications/sendNotification";

export default class ProjectController {
  public path = "/notification";
  public router = express.Router();

  constructor() {
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.get(this.path, auth, this.getNotifications);
    this.router.post(`${this.path}/send`, this.sendNotification);
    this.router.put(
      `${this.path}/change/:notificationId`,
      auth,
      findNotification,
      authNotification,
      this.changeNotificationStatus,
    );
    this.router.put(`${this.path}/clear`, auth, this.clearNotifications);
    this.router.delete(
      `${this.path}/:notificationId`,
      auth,
      findNotification,
      authNotification,
      this.deleteNotification,
    );
  }

  getNotifications(req: Request, res: Response) {
    getNotifications(req, res);
  }

  sendNotification(req: Request, res: Response) {
    sendNotification(req, res);
  }

  changeNotificationStatus(req: Request, res: Response) {
    changeNotificationStatus(req, res);
  }

  clearNotifications(req: Request, res: Response) {
    clearNotifications(req, res);
  }

  deleteNotification(req: Request, res: Response) {
    deleteNotification(req, res);
  }
}

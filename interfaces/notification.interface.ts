import mongoose from "mongoose";

import { NOTIFICATION_STATUS } from "../enums/notificationStatus";

export interface INotification extends mongoose.Document {
  userId?: string;
  text: string;
  status?: NOTIFICATION_STATUS;
}

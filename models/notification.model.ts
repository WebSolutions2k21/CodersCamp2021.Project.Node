import { Schema, Document, model } from "mongoose";

import { NOTIFICATION_STATUS } from "../enums/notificationStatus";
import { INotification } from "../interfaces/notification.interface";

const notificationSchema = new Schema<INotification>({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  text: {
    type: String,
    default: "",
  },
  status: {
    type: NOTIFICATION_STATUS,
    default: NOTIFICATION_STATUS.PENDING,
  },
});

export const notificationModel = model<INotification & Document>("Notification", notificationSchema);

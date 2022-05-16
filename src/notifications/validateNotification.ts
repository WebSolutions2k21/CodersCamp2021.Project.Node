import Joi from "joi-oid";

import { INotification } from "../../interfaces/notification.interface";

export const validateNotification = (notification: INotification) => {
  const schema = Joi.object({
    text: Joi.string().max(50),
    userId: Joi.objectId().required(),
  });

  return schema.validate(notification);
};

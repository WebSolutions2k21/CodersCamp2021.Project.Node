import { Request, Response } from "express"
import bcrypt from 'bcrypt'

import userModel from "../../models/user.model";
import validateChangePassword from "./validatePassword";

export default async function changePassword(req: Request, res: Response) {
    
    const { error } = validateChangePassword(req.body);
	if (error) {
		return res.status(400).send(error.details[0].message);
	}

    let user = await userModel.findOne({ id: req.params._id});
	if (!user) return res.status(400).send("User not found");

    if (req.body.newPassword !== req.body.confirmNewPassword) 
    return res.status(400)
    .send("New password and confirm password must be the same.");

    const validPassword = await bcrypt.compare(
        req.body.oldPassword,
        user.password
      );
      if (!validPassword)
        return res.status(400).send("Invalid  password.");

        const salt = await bcrypt.genSalt(10);
        const newPassword = await bcrypt.hash(req.body.newPassword, salt);

        console.log(user.password)

        user = await userModel.findOneAndUpdate(
            req.userInfo._id,
            { password: newPassword },
            { new: true }
          );
          if (!user) return res.status(404).send("User not found");
        
          console.log(user._id)

          const id = user._id;

    res.status(200).send(`Password changed ${id}`)
}
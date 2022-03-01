import { Request, Response } from "express"
import userModel from "../../models/user.model";

import validateChangePassword from "./validatePassword";

const changePassword = async (req: Request, res: Response) => {
    
    const { error } = validateChangePassword(req.body);
	if (error) {
		return res.status(400).send(error.details[0].message);
	}

    let user = await userModel.findById(req.params._id);
	if (!user) return res.status(400).send("Invalid password.");

    if (req.body.newPassword !== req.body.confirmNewPassword) 
    return res.status(400)
    .send("New password and confirm password must be the same.");

    

	
    res.status(200).send('password Changed')
}

export default changePassword;
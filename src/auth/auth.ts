import { Request, Response } from "express";
import bcrypt from "bcrypt";
<<<<<<< HEAD
=======

import userModel from "../../models/user.model";
import { loginValidation } from "../../src/auth/validateAuth";
>>>>>>> 413709ea9edde123522623ab3c123a001a3cd9b5

import userModel from "../../models/user.model";
import { loginValidation } from "../../src/auth/validateAuth";


<<<<<<< HEAD
=======
// export default router;

>>>>>>> 413709ea9edde123522623ab3c123a001a3cd9b5
export default async function authUser(req: Request, res: Response) {
    //validate the data before we a user
    const { error } = loginValidation(req.body);
	if (error) {
		return res.status(400).send(error.details[0].message);
	}
    //checkinf if the email exist in the database
    let user = await userModel.findOne({ email: req.body.email });
	if (!user) {
		return res.status(400).send("Invalid email or password.");
	} 
    //password is correct
    const validPassword = await bcrypt.compare(req.body.password, user.password)
    if (!validPassword) {return res.status(400).send("Invalid email or password.")}
    

    res.send('Logged In!');
    
}
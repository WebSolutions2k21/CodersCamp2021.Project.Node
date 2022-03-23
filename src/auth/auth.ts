import { Request, Response } from "express";
import bcrypt from "bcrypt";
<<<<<<< HEAD
=======
import { StatusCodes } from "http-status-codes";
>>>>>>> develop

import userModel from "../../models/user.model";
import { loginValidation } from "../../src/auth/validateAuth";

<<<<<<< HEAD
// import { register } from "../../controllers/users.controller";

// const router = express.Router();
// router.post("/register", register);

// export default router;

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
=======
export default async function authUser(req: Request, res: Response) {
  //validate the data before we a user
  const { error } = loginValidation(req.body);
  if (error) {
    return res.status(StatusCodes.BAD_REQUEST).send(error.details[0].message);
  }
  //checkinf if the email exist in the database
  let user = await userModel.findOne({ email: req.body.email });
  if (!user) {
    return res.status(StatusCodes.BAD_REQUEST).send("Invalid email or password.");
  }

  //password is correct
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) {
    return res.status(StatusCodes.BAD_REQUEST).send("Invalid email or password.");
  }

  if (!user.isVerified) return res.status(StatusCodes.BAD_REQUEST).send("You must first confirm the registration.");

  const id = user._id;
  const token = user.generateAuthToken();

  res.send(`Logged In! Your ID: ${id}, Your token: ${token}`);
}
>>>>>>> develop

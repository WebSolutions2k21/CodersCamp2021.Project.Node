import express from "express";
import { AuthController } from "../../controllers/auth.controller";

import { register } from "../../controllers/users.controller";

const router = express.Router();
router.post("/register", register);
router.post("/login", AuthController);

export default router;

import "dotenv/config";
import config from "config";

import AuthController from "../controllers/auth.controller";
import UserController from "../controllers/users.controller";
import ProjectController from "../controllers/project.controller";
import OpinionController from "../controllers/opinion.controller";
import App from "./app/App";
import TeamController from "../controllers/team.controller";
import AppController from "../controllers/app.controller";

if (!config.get("jwtPrivateKey")) {
  console.error("Fatal Error: jwtPrivateKey is not defined.");
  process.exit(1);
}

const app = new App([new UserController(), new AuthController(), new ProjectController(), new TeamController(),  new AppController(), new OpinionController()]);

const server = app.listen();

module.exports = server;

import "dotenv/config";

import { webSocket } from "./webSocket";
import AuthController from "../controllers/auth.controller";
import UserController from "../controllers/users.controller";
import ProjectController from "../controllers/project.controller";
import OpinionController from "../controllers/opinion.controller";
import NotificationController from "../controllers/notification.controller";
import App from "./app/App";
import TeamController from "../controllers/team.controller";
import AppController from "../controllers/app.controller";

if (!process.env.JWT_PRIVATE_KEY) {
  console.error("Fatal Error: jwtPrivateKey is not defined.");
  process.exit(1);
}

const app = new App([
  new UserController(),
  new AuthController(),
  new ProjectController(),
  new TeamController(),
  new AppController(),
  new OpinionController(),
  new NotificationController(),
]);

const server = app.listen();
webSocket(server);

module.exports = server;

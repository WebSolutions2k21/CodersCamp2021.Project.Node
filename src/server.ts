import ProjectController from "../controllers/project.controller";
import UserController from "../controllers/users.controller";
import App from "./app/App";

const app = new App([new UserController(), new ProjectController()]);

const server = app.listen();

module.exports = server;

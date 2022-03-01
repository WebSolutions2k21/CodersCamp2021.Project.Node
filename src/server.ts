import "dotenv/config";
import config from "config";

import AuthController from '../controllers/auth.controller'
import UserController from '../controllers/users.controller'
import App from './app/App'


if (!config.get("jwtPrivateKey")) {
  console.error("Fatal Error: jwtPrivateKey is not defined.");
  process.exit(1);
}

const app = new App([new UserController(), new AuthController(),])

const server = app.listen()

module.exports = server
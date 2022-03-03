import AuthController from '../controllers/auth.controller'
import UserController from '../controllers/users.controller'
import ProjectController from '../controllers/project.controller'
import App from './app/App'

const app = new App([new UserController(), new AuthController(), new ProjectController()])


const server = app.listen();

module.exports = server;

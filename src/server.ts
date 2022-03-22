import AuthController from '../controllers/auth.controller'
import UserController from '../controllers/users.controller'
import App from './app/App'

const app = new App([new UserController(), new AuthController(),])

const server = app.listen()

module.exports = server

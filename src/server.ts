import UserController from '../controllers/users.controller'
import App from './app/App'

const app = new App([new UserController()])

const server = app.listen()

module.exports = server

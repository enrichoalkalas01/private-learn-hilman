const Express = require('express')
const Routes = Express.Router()

// Controllers
const {
    Register, Login
} = require('../../controllers/authcontroller')

// Routes
Routes.get('/', function(request, response) { response.send("Welcome to our auth api!") })
Routes.post('/register', Register)
Routes.post('/login', Login)


module.exports = Routes 
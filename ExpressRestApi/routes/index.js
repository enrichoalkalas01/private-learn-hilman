const Express = require('express')
const Routes = Express.Router()

// External Routes
const authRoutes = require('./auth/index')

// Routes
Routes.get('/', function(request, response) { response.send("Welcome to our api!") })
Routes.use('/auth', authRoutes)

module.exports = Routes
// Setup Library / Depedencies / Tools Support
const Express = require('express')
const App = Express()
const Morgan = require('morgan')
const Dotenv = require('dotenv')
const Cors = require('cors')
const CookieParser = require('cookie-parser')
const PORT = process.env.PORT || 6000

// Setup Env Files
Dotenv.config({ path: __dirname + '/.env' })

// Setup use bodyparser and others
App.use(Express.json())
App.use(Express.urlencoded({ extended: true }))
App.use(Express.static('public')) // supaya user bisa akses folder public
App.use(Morgan('dev'))
App.use(CookieParser())
App.use(Cors())

// Running Express Setup
const Server = App.listen(PORT, function() {
    console.log(`Server is running in port : ${ PORT }`)
})

// Connect To Routes
const Routes = require('./routes/index')
App.use('/api/v1', Routes) // domain.com + /api/v1

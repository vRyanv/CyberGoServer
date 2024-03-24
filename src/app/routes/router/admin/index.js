const express = require('express')
const route = express.Router()
const DriverRegistrationRouter = require('./DriverRegistrationRouter')

route.use('/driver-registration', DriverRegistrationRouter)

module.exports = route
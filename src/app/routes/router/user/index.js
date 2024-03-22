const express = require('express')
const route = express.Router()
const DriverRegistrationRouter = require('./DriverRegistrationRouter')
const ProfileRouter = require('./ProfileRouter')

route.use('/driver-registration', DriverRegistrationRouter)
route.use('/profile', ProfileRouter)
module.exports = route
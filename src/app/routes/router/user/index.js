const express = require('express')
const route = express.Router()
const DriverRegistrationRouter = require('./DriverRegistrationRouter')
const ProfileRouter = require('./ProfileRouter')
const VehicleRouter = require('./VehicleRouter')

route.use('/driver-registration', DriverRegistrationRouter)
route.use('/profile', ProfileRouter)
route.use('/vehicle', VehicleRouter)
module.exports = route
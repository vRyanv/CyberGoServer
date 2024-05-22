const express = require('express')
const route = express.Router()
const DriverRegistrationRouter = require('./DriverRegistrationRouter')
const ProfileRouter = require('./ProfileRouter')
const VehicleRouter = require('./VehicleRouter')

const {UserController} = require('../../../controllers')

route.use('/driver-registration', DriverRegistrationRouter)
route.use('/profile', ProfileRouter)
route.use('/vehicle', VehicleRouter)
route.get('/view-user-profile/:user_id', UserController.ViewUserProfileAction)
route.get('/notification', UserController.GetNotificationAction)
route.get('/statistic/:start_date/:end_date', UserController.GetStatisticAction)
module.exports = route
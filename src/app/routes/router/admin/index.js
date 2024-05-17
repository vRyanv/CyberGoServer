const express = require('express')
const route = express.Router()
const DriverRegistrationRouter = require('./DriverRegistrationRouter')
const UserManagementRouter = require('./UserManagementRouter')

route.use('/driver-registration', DriverRegistrationRouter)
route.use('/user-management', UserManagementRouter)

module.exports = route
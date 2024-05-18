const express = require('express')
const route = express.Router()
const DriverRegistrationRouter = require('./DriverRegistrationRouter')
const UserManagementRouter = require('./UserManagementRouter')
const DashboardRouter = require('./DashboardRouter')

route.use('/driver-registration', DriverRegistrationRouter)
route.use('/user-management', UserManagementRouter)
route.use('/dashboard',DashboardRouter )

module.exports = route
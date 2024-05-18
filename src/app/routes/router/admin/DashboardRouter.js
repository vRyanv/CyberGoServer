const express = require('express')
const route = express.Router()
const {DashboardController} = require('../../../controllers')

route.get('/trip-statistic/:from_date/:to_date', DashboardController.GetTripStatisticsAction)
route.get('/vehicle-statistic/:from_date/:to_date', DashboardController.GetVehicleStatisticsAction)
route.get('/general-statistic', DashboardController.GetGeneralStatisticsAction)

module.exports = route
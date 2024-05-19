const express = require('express')
const route = express.Router()
const {VehicleController} = require('../../../controllers')

route.get('/list', VehicleController.GetVehicleListAction)
route.get('/accepted-list', VehicleController.GetVehicleAcceptedListAction)
route.get('/vehicle-detail/:vehicle_id', VehicleController.GetVehicleDetailAction)
module.exports = route
const express = require('express')
const route = express.Router()
const {VehicleController} = require('../../../controllers')

route.get('/list', VehicleController.VehicleList)
route.get('/accepted-list', VehicleController.VehicleAcceptedList)
module.exports = route
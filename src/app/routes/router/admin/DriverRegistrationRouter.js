const express = require('express')
const route = express.Router()

const {DriverRegistrationController} = require('../../../controllers')


route.get('/', DriverRegistrationController.DriverRegistrationListAction)
route.get('/detail/:vehicle_id', DriverRegistrationController.DriverRegistrationDetailAction)
route.put('/accept/', DriverRegistrationController.AcceptRegistrationAction)
route.put('/refuse/', DriverRegistrationController.RefuseRegistrationAction)

module.exports = route
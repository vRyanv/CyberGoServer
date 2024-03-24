const express = require('express')
const route = express.Router()

const {DriverRegistrationController} = require('../../../controllers')


route.get('/', DriverRegistrationController.DriverRegistrationListAction)
route.get('/detail/:driver_registration_id', DriverRegistrationController.DriverRegistrationDetail)

module.exports = route
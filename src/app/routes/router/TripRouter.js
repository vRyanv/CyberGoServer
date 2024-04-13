const express = require('express')
const route = express.Router()
const {TripController} = require('../../controllers');

route.post('/trip-list', TripController.TripList)
route.post('/create', TripController.Create)
route.put('/update', TripController.Update)

module.exports = route
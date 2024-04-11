const express = require('express')
const route = express.Router()
const {TripSharingController} = require('../../controllers');

route.post('/trip-list', TripSharingController.TripList)
route.post('/create', TripSharingController.Create)
route.put('/update', TripSharingController.Update)

module.exports = route
const express = require('express')
const route = express.Router()
const MemberRouter = require('./MemberRouter')
const {TripController} = require('../../../controllers');

route.post('/trip-list', TripController.TripList)
route.post('/create', TripController.Create)
route.put('/update', TripController.Update)
route.use('/member', MemberRouter)

route.post('/passenger-find-trip', TripController.PassengerFindTrip)

module.exports = route
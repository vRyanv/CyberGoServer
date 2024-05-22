const express = require('express')
const route = express.Router()
const MemberRouter = require('./MemberRouter')
const {TripController} = require('../../../controllers');

route.get('/list', TripController.TripList)
route.post('/create', TripController.Create)
route.post('/update-status', TripController.UpdateStatus)
route.put('/update-information', TripController.UpdateInformation)
route.put('/update-location', TripController.UpdateLocation)
route.delete('/delete/:trip_id', TripController.Delete)
route.use('/member', MemberRouter)


route.post('/passenger-find-trip', TripController.PassengerFindTrip)

module.exports = route
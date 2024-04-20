const Country = require('./CountrySchema')
const User = require('./UserSchema')
const Vehicle = require('./VehicleSchema')
const Notification = require('./NotificationSchema')
const Trip = require('./TripSchema')
const Destination = require('./DestinationSchema')
const Member = require('./MemberSchema')

module.exports = {
    Member,
    Notification,
    Destination,
    Trip,
    Country,
    User,
    Vehicle,
}
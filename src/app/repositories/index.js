const UserRepository = require('./UserRepository')
const CountryRepository = require('./CountryRepository')
const VehicleRepository = require('./VehicleRepository')
const DriverRegistrationRepository = require('./DriverRegistrationRepository')
const NotificationRepository = require('./NotificationRepository')
const TripRepository = require('./TripRepository')
const DestinationRepository = require('./DestinationRepository')
const MemberRepository = require('./MemberRepository')

module.exports = {
    MemberRepository,
    DestinationRepository,
    TripRepository,
    NotificationRepository,
    DriverRegistrationRepository,
    VehicleRepository,
    CountryRepository,
    UserRepository,
}
const MapController = require('./MapController')
const SecurityController = require('./SecurityController')
const UserController = require('./UserController')
const DriverRegistrationController = require('./DriverRegistrationController')
const VehicleController = require('./VehicleController')
const TripController = require('./TripController')
const MemberController = require('./MemberController')
const RatingController = require('./RatingController')
const ChatController = require('./ChatController')
const UserManagementController = require('./admin/UserManagementController')
const NotificationController = require('./NotificationController')
const DashboardController = require('./admin/DashboardController')

module.exports = {
    DashboardController,
    NotificationController,
    UserManagementController,
    ChatController,
    RatingController,
    MemberController,
    TripController,
    DriverRegistrationController,
    VehicleController,
    MapController,
    UserController,
    SecurityController
}
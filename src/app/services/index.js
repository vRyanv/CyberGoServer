const MapService = require('./MapService')
const UserService = require('./UserService')
const MailService = require('./MailService')
const DriverRegistrationService = require('./DriverRegistrationService')
const SocketService = require('./SocketService')
const FCMService = require('./FCMService')
const VehicleService = require('./VehicleService')
const TripService = require('./TripService')
const MemberService = require('./MemberService')
const RatingService = require('./RatingService')
const ChatService = require('./ChatService')
const UserManagementService = require('./admin/UserManagementService')
const NotificationService = require('./NotificationService')
const DashboardService = require('./admin/DashboardService')

module.exports = {
    DashboardService,
    NotificationService,
    UserManagementService,
    ChatService,
    RatingService,
    MemberService,
    TripService,
    VehicleService,
    SocketService,
    DriverRegistrationService,
    UserService,
    MapService,
    MailService
}
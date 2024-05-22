const LanguageCode = require('./LanguageCode')
const StatusCode = require('./StatusCode')
const Role = require('./Role')
const AccountStatus = require('./AccountStatus')
const ErrorType = require('./ErrorType')
const ContentType = require('./ContentType')
const FieldName = require('./FieldName')
const StoragePath = require('./StoragePath')
const MimeType = require('./MimeType')
const VehicleStatus = require('./VehicleStatus')
const VehicleType = require('./VehicleType')
const SocketEvent = require('./SocketEvent')
const NotificationType = require('./NotificationType')
const SystemDefault = require('./SystemDefault')
const MemberStatus = require('./MemberStatus')
const TripStatus = require('./TripStatus')
const FirebaseType = require('./FirebaseType')

const DEFAULT_AVATAR = 'default_avatar.png'
module.exports = {
    FirebaseType,
    TripStatus,
    MemberStatus,
    SystemDefault,
    NotificationType,
    VehicleType,
    SocketEvent,
    VehicleStatus,
    MimeType,
    StoragePath,
    FieldName,
    ContentType,
    ErrorType,
    LanguageCode,
    StatusCode,
    Role,
    AccountStatus,
    DEFAULT_AVATAR
}
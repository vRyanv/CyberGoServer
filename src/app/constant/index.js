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

const DEFAULT_AVATAR = 'avatar_default.webp'
module.exports = {
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
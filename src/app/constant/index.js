const LanguageCode = require('./LanguageCode')
const StatusCode = require('./StatusCode')
const Role = require('./Role')
const AccountStatus = require('./AccountStatus')
const ErrorType = require('./ErrorType')
const AcceptType = require('./AcceptType')
const FieldName = require('./FieldName')
const StoragePath = require('./StoragePath')
const MimeType = require('./MimeType')

const DEFAULT_AVATAR = 'avatar_default.webp'
module.exports = {
    MimeType,
    StoragePath,
    FieldName,
    AcceptType,
    ErrorType,
    LanguageCode,
    StatusCode,
    Role,
    AccountStatus,
    DEFAULT_AVATAR
}
const express = require('express')
const route = express.Router()

const {UserController} = require('../../../controllers')
const {MulterUpload} = require('../../../middleware')
const {FieldName, StoragePath} = require('../../../constant')

route.post(
    '/',
    MulterUpload(StoragePath.DRIVER_PATH).fields([
        {name: FieldName.FRONT_VEHICLE_REGISTRATION_CERTIFICATE, maxCount: 1},
        {name: FieldName.BACK_VEHICLE_REGISTRATION_CERTIFICATE, maxCount: 1},
        {name: FieldName.FRONT_DRIVING_LICENSE, maxCount: 1},
        {name: FieldName.BACK_DRIVING_LICENSE, maxCount: 1},
        {name: FieldName.FRONT_VEHICLE, maxCount: 1},
        {name: FieldName.BACK_VEHICLE, maxCount: 1},
        {name: FieldName.RIGHT_VEHICLE, maxCount: 1},
        {name: FieldName.LEFT_VEHICLE, maxCount: 1},
    ]),
    UserController.DriverRegistrationAction)

module.exports = route
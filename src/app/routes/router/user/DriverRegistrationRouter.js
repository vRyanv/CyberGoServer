const express = require('express')
const route = express.Router()

const {UserController} = require('../../../controllers')
const {MulterUpload} = require('../../../middleware')
const {FieldName, StoragePath} = require('../../../constant')

route.post(
    '/',
    MulterUpload(StoragePath.DRIVER_PATH).fields([
        {name: FieldName.FRONT_ID_CARD, maxCount: 1},
        {name: FieldName.BACK_ID_CARD, maxCount: 1},
        {name: FieldName.DRIVER_AVATAR, maxCount: 1},
        {name: FieldName.CURRICULUM_VITAE_IMG, maxCount: 1},
        {name: FieldName.FRONT_DRIVING_LICENSE, maxCount: 1},
        {name: FieldName.BACK_DRIVING_LICENSE, maxCount: 1},
        {name: FieldName.FRONT_TRANSPORT, maxCount: 1},
        {name: FieldName.BACK_TRANSPORT, maxCount: 1},
        {name: FieldName.RIGHT_TRANSPORT, maxCount: 1},
        {name: FieldName.LEFT_TRANSPORT, maxCount: 1},
    ]),
    UserController.DriverRegistration)

module.exports = route
const express = require('express')
const route = express.Router()

const {MulterUpload} = require('../../../middleware')

const {UserController} = require('../../../controllers')
const { FieldName, StoragePath } = require('../../../constant')

route.get('/', UserController.ProfileAction)
route.put(
    '/update', 
    MulterUpload(StoragePath.AVATAR_PATH).single(FieldName.AVATAR),
    UserController.UpdateProfileAction
)
route.put(
    '/update-id-card', 
    MulterUpload(StoragePath.ID_CARD_PATH).fields([
        {name: FieldName.FRONT_ID_CARD, maxCount: 1},
        {name: FieldName.BACK_ID_CARD, maxCount: 1}
    ]),
    UserController.UpdateIdCardAction
)

module.exports = route
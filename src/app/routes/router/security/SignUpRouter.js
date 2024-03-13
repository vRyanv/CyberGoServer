const express = require('express')
const route = express.Router()
const {SecurityController} = require('../../../controllers');

route.post('/', SecurityController.SignUpAction)
route.get('/check-phone-existed/:prefix/:phone_number', SecurityController.CheckPhoneExistedAction)
route.get('/check-mail-existed/:email', SecurityController.CheckMailExistedAction)
route.put('/activate-account', SecurityController.ActiveAccountAction)

module.exports = route
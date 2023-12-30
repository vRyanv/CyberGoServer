const express = require('express')
const route = express.Router()
const signUpController = require('../controllers/sign-up.controller');

route.post('/handle', signUpController.signUpAction)
route.get('/check-phone-existed/:prefix/:phone_number', signUpController.checkPhoneExistedAction)
route.get('/check-mail-existed/:email', signUpController.checkMailExistedAction)
route.put('/active-account', signUpController.activeAccountAction)

module.exports = route
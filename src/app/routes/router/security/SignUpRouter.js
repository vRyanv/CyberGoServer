const express = require('express')
const route = express.Router()
const {SecurityController} = require('../../../controllers');

route.post('/', SecurityController.SignUpAction)
route.put('/activate-account', SecurityController.ActiveAccountAction)

module.exports = route
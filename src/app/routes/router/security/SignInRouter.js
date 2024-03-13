const express = require('express')
const route = express.Router()
const {SecurityController} = require('../../../controllers');

route.post('/', SecurityController.SignInAction)

module.exports = route
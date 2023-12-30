const express = require('express')
const route = express.Router()
const signInController = require('../controllers/sign-in.controller');


route.post('/handle', signInController.signInHandle)

module.exports = route
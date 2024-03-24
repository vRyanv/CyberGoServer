const express = require('express')
const route = express.Router()
const SignInRouter = require('./SignInRouter')
const SignUpRouter = require('./SignUpRouter')
const {SecurityController} = require('../../../controllers')
const {Auth} = require("../../../middleware");
const {Role} = require("../../../constant");

route.use('/sign-in', SignInRouter)
route.use('/sign-up', SignUpRouter)
route.put(
    '/firebase-token',
    (req, res, next) => Auth(req, res, next, [Role.USER, Role.DRIVER, Role.ADMIN]),
    SecurityController.UpdateFirebaseToken)
module.exports = route
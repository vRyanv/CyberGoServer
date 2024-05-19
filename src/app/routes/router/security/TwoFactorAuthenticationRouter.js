const express = require("express");
const route = express.Router();

const {SecurityController} = require('../../../controllers')
const {Auth} = require("../../../middleware");
const {Role} = require("../../../constant");

route.get(
    '/qr-code',
    (req, res, next) => Auth(req, res, next, [Role.USER, Role.DRIVER, Role.ADMIN]),
    SecurityController.GetQRCodeAction
)
route.post('/verify', SecurityController.Verify2FAAction)
route.put(
    '/update-2fa-status',
    (req, res, next) => Auth(req, res, next, [Role.USER, Role.DRIVER, Role.ADMIN]),
    SecurityController.Update2FAStatusStatus
)

module.exports = route
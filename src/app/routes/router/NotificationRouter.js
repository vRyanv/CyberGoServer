const express = require('express')
const route = express.Router()
const {NotificationController} = require('../../controllers');
const {Auth} = require("../../middleware");
const {Role} = require("../../constant");

route.get(
    '/admin',
    (req, res, next) => Auth(req, res, next, [Role.ADMIN]),
    NotificationController.GetAdminNotificationAction
)


module.exports = route
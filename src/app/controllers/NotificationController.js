const {NotificationService} = require('../services')
const {StatusCode} = require("../constant");
const NotificationController = {
    GetAdminNotificationAction(req, res) {
        NotificationService.GetAdminNotification()
            .then(notifications =>
                res.status(200).json({code: StatusCode.OK, notifications})
            )
    }
}

module.exports = NotificationController
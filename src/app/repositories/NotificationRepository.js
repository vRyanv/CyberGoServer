const {NotificationSchema} = require("../schemas");

const NotificationRepository = {
    CreateNotification(notification) {
        return NotificationSchema.create(notification)
    },
    GetNotificationOfUser() {

    },
    GetNotificationOfAdmin() {

    }
}

module.exports = NotificationRepository
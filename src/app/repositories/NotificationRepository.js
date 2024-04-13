const {Notification} = require("../schemas");

const NotificationRepository = {
    CreateNotification(notification) {
        return Notification.create(notification)
    },
    GetNotificationOfUser() {

    },
    GetNotificationOfAdmin() {

    }
}

module.exports = NotificationRepository
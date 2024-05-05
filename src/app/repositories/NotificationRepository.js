const {Notification} = require("../schemas");

const NotificationRepository = {
    CreateNotification(notification) {
        return Notification.create(notification)
    },
    GetNotificationOfUser(user_id) {
        return Notification.find({user:user_id}).sort({createdAt: 'desc'}).lean()
    },
    GetNotificationOfAdmin() {

    }
}

module.exports = NotificationRepository
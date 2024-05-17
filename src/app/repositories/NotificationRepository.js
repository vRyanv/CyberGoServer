const {Notification} = require("../schemas");
const {NotificationType} = require('../constant')

const NotificationRepository = {
    CreateNotification(notification) {
        return Notification.create(notification)
    },
    GetNotificationOfUser(user_id) {
        return Notification.find({user:user_id, type: NotificationType.USER}).sort({createdAt: 'desc'}).lean()
    },
    GetNotificationOfAdmin() {
        return Notification.find({type: NotificationType.ADMIN})
            .populate('user')
            .sort({createdAt: 'desc'})
            .lean()
    }
}

module.exports = NotificationRepository
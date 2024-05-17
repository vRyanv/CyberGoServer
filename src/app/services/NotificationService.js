const {NotificationRepository} = require('../repositories')
const NotificationService = {
    async GetAdminNotification() {
        let notifications = await NotificationRepository.GetNotificationOfAdmin()

        notifications = notifications.map(notify => {
            return {
                full_name: notify.user.full_name,
                avatar: notify.user.avatar,
                content: notify.content,
                vehicle_id: notify.vehicle.toString()
            }
        })
        console.log(notifications)
        return notifications
    }
}

module.exports = NotificationService
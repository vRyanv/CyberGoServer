const {
    VehicleStatus,
    StatusCode,
    SocketEvent,
    NotificationType,
    SystemDefault
} = require("../constant");
const {DriverRegistrationRepository, NotificationRepository} = require("../repositories");
const FCMService = require('./FCMService')
const {Mailer} = require('../utils')
const {MailKey} = require('../../env')

const DriverRegistrationService = {
    async ResolveRegistration(vehicle_id, status, title, content) {
        let vehicle
        try {
            vehicle = await DriverRegistrationRepository.UpdateVehicleStatus(vehicle_id, status)
        } catch (error) {
            console.log('UpdateVehicleStatus error::', error)
            return false
        }
        if (vehicle) {
            const {_id, email, online_status, firebase_token} = vehicle.driver
            const subject = title
            content = content + " " + vehicle.license_plates
            // Mailer(MailKey.EMAIL, email, subject, content)
            //     .then(result => {
            //         console.log('Mailer::', result)
            //     }).catch(error => {
            //     console.log('Mailer error::', error)
            // })
            let notification = {
                user: _id.toString(),
                title: subject,
                avatar: SystemDefault.LOGO,
                content,
                type: NotificationType.USER
            }
            try {
                notification = await NotificationRepository.CreateNotification(notification)
            } catch (error) {
                console.log("CreateNotification error::", error)
                return false
            }

            //convert notification for mobile
            notification = {
                _id: notification._id.toString(),
                datetime: notification.createdAt.getTime().toString(),
                avatar: notification.avatar,
                title: notification.title,
                content: notification.content,
            }
            if (online_status) {
                const socket = __user_sockets.get(_id.toString())
                if (socket) {
                    socket.emit(SocketEvent.NOTIFICATION, JSON.stringify(notification))
                } else {
                    if(firebase_token == ""){
                        return
                    }
                    FCMService.SendSingleNotification({...notification}, firebase_token)
                }
            } else {
                if(firebase_token == ""){
                    return
                }
                FCMService.SendSingleNotification({...notification}, firebase_token)
            }
            return true
        }
        return StatusCode.NOT_FOUND
    },
    GetDriverRegistrationList(status = VehicleStatus.ALL) {
        if (status === VehicleStatus.ALL) {
            return DriverRegistrationRepository.GetVehicleList()
        }
        return DriverRegistrationRepository.GetVehicleListByStatus(status)
    },
    async GetDriverRegistrationDetail(vehicle_id) {
        try {
            return await DriverRegistrationRepository.GetDriverRegistrationDetail(vehicle_id)
        } catch (error) {
            console.error(error)
            return false
        }
    }
}

module.exports = DriverRegistrationService
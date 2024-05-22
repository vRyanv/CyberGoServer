const {
    VehicleStatus,
    NotificationType,
    SystemDefault,
    FirebaseType
} = require("../constant");
const {DriverRegistrationRepository, NotificationRepository} = require("../repositories");
const FCMService = require('./FCMService')

const DriverRegistrationService = {
    async ResolveRegistration(vehicle_id, status, title, content) {
        console.log(vehicle_id, status, title, content)
        let vehicle
        try {
            if(status === VehicleStatus.ACCEPTED){
                vehicle = await DriverRegistrationRepository.UpdateVehicleStatus(vehicle_id, status)
            } else {
                vehicle = await DriverRegistrationRepository.RefuseVehicle(vehicle_id, status, content)
            }

        } catch (error) {
            console.log('UpdateVehicleStatus error::', error)
            return false
        }
        const {_id, firebase_token} = vehicle.driver
        const subject = title
        content = content + " " + vehicle.license_plates

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
            firebase_type: FirebaseType.NOTIFICATION
        }

        if (firebase_token !== "") {
            console.log("firebase_token", firebase_token)
            FCMService.SendSingleNotification({...notification}, firebase_token)
        }
        return true
    },
    GetDriverRegistrationList(status = VehicleStatus.ALL) {
        console.log(status)
        if (status === VehicleStatus.ALL) {
            return DriverRegistrationRepository.GetVehicleList()
        }
        return DriverRegistrationRepository.GetVehicleListByStatus(status)
    },
    async GetDriverRegistrationDetail(vehicle_id) {
        try {
            console.log(vehicle_id)
            return await DriverRegistrationRepository.GetDriverRegistrationDetail(vehicle_id)
        } catch (error) {
            console.error(error)
            return false
        }
    }
}

module.exports = DriverRegistrationService
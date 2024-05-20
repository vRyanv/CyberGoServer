const {DriverRegistrationService} = require('../services')
const {StatusCode, VehicleStatus} = require("../constant");

const DriverRegistrationController = {
    async RefuseRegistrationAction(req, res){
        const {vehicle_id, refuse_reason, license_plates} = req.body
        const title = 'Vehicle registration refused'
        const content = `Hello, I am the admin of Cyber Go, Your registration was rejected for the following reason: ${refuse_reason}. License plates: ${license_plates}`
        const result_refuse = await DriverRegistrationService.ResolveRegistration(
            vehicle_id,
            VehicleStatus.REFUSED,
            title,
            content
        )
        if(result_refuse === StatusCode.NOT_FOUND){
            return res.status(200).json({code: StatusCode.NOT_FOUND, message: 'Not found driver registration'})
        } else if(result_refuse){
            return res.status(200).json({code: StatusCode.UPDATED, message: 'Driver registration has been refused'})
        }
        return res.status(200).json({code: StatusCode.BAD_REQUEST, message: 'Something went wrong!'})

    },
    async AcceptRegistrationAction(req, res){
        const {vehicle_id} = req.body
        const title = 'Vehicle registration accepted'
        const content = 'Hello, I am the admin of Cyber Go, your registration has been approved and you can share your trip now. License plates:'
        const result_accept = await DriverRegistrationService.ResolveRegistration(
            vehicle_id,
            VehicleStatus.ACCEPTED,
            title,
            content
            )
        if(result_accept === StatusCode.NOT_FOUND){
            return res.status(200).json({code: StatusCode.NOT_FOUND, message: 'Not found driver registration'})
        } else if(result_accept){
            return res.status(200).json({code: StatusCode.UPDATED, message: 'Driver registration has been accepted'})
        }
        return res.status(200).json({code: StatusCode.BAD_REQUEST, message: 'Something went wrong!'})
    },
    async DriverRegistrationListAction(req, res){
        const {status} = req.params
        const driver_registration_list = await DriverRegistrationService.GetDriverRegistrationList(status)
        return res.status(200).json({code: StatusCode.OK, driver_registration_list, message: 'Get driver registrations successfully'})
    },
    async DriverRegistrationDetailAction(req, res){
        const {vehicle_id} = req.params
        const driver_registration_detail = await DriverRegistrationService.GetDriverRegistrationDetail(vehicle_id)
        if(driver_registration_detail){
            return res.status(200).json({code: StatusCode.OK, driver_registration_detail, message: 'Get driver registration detail successfully'})
        }
        return res.status(200).json({code: StatusCode.NOT_FOUND, message: 'Not found driver registrations'})
    },

}

module.exports = DriverRegistrationController
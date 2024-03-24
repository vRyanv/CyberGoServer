const {DriverRegistrationService} = require('../services')
const {StatusCode} = require("../constant");

const DriverRegistrationController = {
    async DriverRegistrationListAction(req, res){
        const {status} = req.params
        const driver_registration_list = await DriverRegistrationService.GetDriverRegistrationList(status)
        return res.status(200).json({code: StatusCode.OK, driver_registration_list, message: 'Get driver registrations successfully'})
    },
    async DriverRegistrationDetail(req, res){
        const {driver_registration_id} = req.params
        const driver_registration_detail = await DriverRegistrationService.GetDriverRegistrationDetail(driver_registration_id)
        console.log(driver_registration_id)
        console.log(driver_registration_detail)
        if(driver_registration_detail){
            return res.status(200).json({code: StatusCode.OK, driver_registration_detail, message: 'Get driver registration detail successfully'})
        }
        return res.status(200).json({code: StatusCode.NOT_FOUND, message: 'Not found driver registrations'})
    }
}

module.exports = DriverRegistrationController
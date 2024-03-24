const {VehicleStatus} = require("../constant");
const {DriverRegistrationRepository} = require("../repositories");

const DriverRegistrationService = {
    GetDriverRegistrationList(status = VehicleStatus.ALL){
        if(status === VehicleStatus.ALL){
            return DriverRegistrationRepository.GetVehicleList()
        }
        return DriverRegistrationRepository.GetVehicleListByStatus(status)
    },
    async GetDriverRegistrationDetail(vehicle_id){
        try {
            return await DriverRegistrationRepository.GetDriverRegistrationDetail(vehicle_id)
        } catch (error){
            console.error(error)
            return false
        }
    }
}

module.exports = DriverRegistrationService
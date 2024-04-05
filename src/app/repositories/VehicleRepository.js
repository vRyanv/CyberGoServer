const {Vehicle} = require('../schemas')
const {VehicleStatus} = require('../constant')
const VehicleRepository = {
    GetAllVehicleOfUser(user_id){
        return Vehicle.find({driver: user_id})
            .sort({registration_date : 'desc'})
            .lean()
    },
    GetAllVehicleAcceptedOfUser(user_id){
        return Vehicle.find({
            driver: user_id,
            status: VehicleStatus.ACCEPTED
        }).sort({registration_date : 'desc'}).lean()
    }
}

module.exports = VehicleRepository

const {Vehicle} = require('../schemas')
const {VehicleStatus} = require('../constant')
const VehicleRepository = {
    DeleteVehicle(user_id, vehicle_id){
      return Vehicle.updateOne(
          {driver:user_id, _id:vehicle_id},
          {status: VehicleStatus.DELETED}
      )
    },
    FindById(vehicle_id){
        return Vehicle.findById(vehicle_id).lean()
    },
    CountVehicleAccepted(){
        return Vehicle.countDocuments({status: VehicleStatus.ACCEPTED})
    },
    GetVehicleStatistic(from_date, to_date){
        return Vehicle.find({
            status: VehicleStatus.ACCEPTED,
            createdAt: {
                $gte: from_date,
                $lte: to_date,
            }
        }).lean()
    },
    FindByUserId(user_id){
        return Vehicle.find({driver:user_id}).lean()
    },
    GetAllVehicleOfUser(user_id){
        return Vehicle.find({driver: user_id, status: {$ne: VehicleStatus.DELETED}})
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

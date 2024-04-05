const {Vehicle} = require("../schemas");

module.exports = {
    UpdateVehicleStatus(vehicle_id, status){
        return Vehicle.findOneAndUpdate({_id:vehicle_id}, {status})
            .populate('driver')
            .lean()
    },
    GetDriverRegistrationDetail(vehicle_id){
        return Vehicle.findById(vehicle_id)
            .populate({
                path: 'driver',
                select: 'email full_name gender id_number phone_number address avatar back_id_card front_id_card country',
                populate: 'country'
            })
            .lean()
    },
    CreateDriverRegistration(vehicle){
        return Vehicle.create(vehicle)
    },
    GetVehicleList(){
        return Vehicle.find({})
            .select('vehicle_type license_plates status')
            .populate({
                path: 'driver',
                select:'full_name id_number phone_number avatar',
                populate: 'country'
            })
            .sort({registration_date: 'desc'})
            .lean()
    },
    GetVehicleListByStatus(status){
        return Vehicle.find({status})
            .sort({registration_date: 'desc'})
            .lean()
    }
}
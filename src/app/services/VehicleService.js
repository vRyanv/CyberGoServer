const {VehicleRepository} = require('../repositories')
const VehicleService = {
    async DeleteVehicle(user_id, vehicle_id){
        try{
            return await VehicleRepository.DeleteVehicle(user_id, vehicle_id)
        } catch (error){
            console.log(error)
            return false
        }
    },
    async GetVehicleDetail(params){
        const {vehicle_id} = params
        try{
            return await VehicleRepository.FindById(vehicle_id)
        } catch (err){
            console.log(err)
            return false
        }
    },
    async GetVehicleList(user_id){
        try {
            const vehicle_list = await VehicleRepository.GetAllVehicleOfUser(user_id)
            vehicle_list.map(vehicle => {
                vehicle.registration_date = vehicle.registration_date.getTime()
            })
            return vehicle_list
        } catch (error){
            console.log(error)
            return false
        }
    },
    async GetVehicleAcceptedList(user_id){
        try {
            const vehicle_list = await VehicleRepository.GetAllVehicleAcceptedOfUser(user_id)
            vehicle_list.map(vehicle => {
                vehicle.registration_date = vehicle.registration_date.getTime()
            })
            return vehicle_list
        } catch (error){
            console.log(error)
            return false
        }
    }
}

module.exports = VehicleService
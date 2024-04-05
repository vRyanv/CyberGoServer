const {VehicleService} = require('../services')
const {StatusCode} = require('../constant')
const VehicleController = {
    async VehicleList(req, res){
        const user_id = req.user.id
        const vehicle_list = await VehicleService.GetVehicleList(user_id)
        if(vehicle_list){
            return res.status(200).json({code: StatusCode.OK, vehicle_list})
        }
        return res.status(200).json({code: StatusCode.BAD_REQUEST, message: 'BAD_REQUEST'})
    },
    async VehicleAcceptedList(req, res){
        const user_id = req.user.id
        const vehicle_list = await VehicleService.GetVehicleAcceptedList(user_id)
        if(vehicle_list){
            return res.status(200).json({code:StatusCode.OK, vehicle_list})
        }
        return res.status(200).json({code:StatusCode.BAD_REQUEST, message: 'BAD_REQUEST'})
    }
}

module.exports = VehicleController
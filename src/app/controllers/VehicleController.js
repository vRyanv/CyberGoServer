const {VehicleService} = require('../services')
const {StatusCode} = require('../constant')
const VehicleController = {
    async GetVehicleDetailAction(req, res){
        VehicleService.GetVehicleDetail(req.params)
            .then(vehicle => {
                if(vehicle){
                    return  res.status(StatusCode.OK).json({code: StatusCode.OK, vehicle})
                }
                return res.status(StatusCode.OK).json({code: StatusCode.NOT_FOUND})
            })
    },
    async GetVehicleListAction(req, res){
        const user_id = req.user.id
        const vehicle_list = await VehicleService.GetVehicleList(user_id)
        if(vehicle_list){
            return res.status(200).json({code: StatusCode.OK, vehicle_list})
        }
        return res.status(200).json({code: StatusCode.BAD_REQUEST, message: 'BAD_REQUEST'})
    },
    async GetVehicleAcceptedListAction(req, res){
        const user_id = req.user.id
        const vehicle_list = await VehicleService.GetVehicleAcceptedList(user_id)
        if(vehicle_list){
            return res.status(200).json({code:StatusCode.OK, vehicle_list})
        }
        return res.status(200).json({code:StatusCode.BAD_REQUEST, message: 'BAD_REQUEST'})
    }
}

module.exports = VehicleController
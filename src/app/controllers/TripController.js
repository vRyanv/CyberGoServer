const {TripService} = require('../services')
const {StatusCode} = require("../constant");
const tripService = require('../services/TripService');

const TripController = {
    TripList(req, res){

    },
    async Create(req, res){
        const trip = await TripService.Create(req)
        if(trip){
            return res.status(200).json({code: StatusCode.CREATED, trip, message: 'Created successfully'})
        }
        return res.status(200).json({code: StatusCode.BAD_REQUEST, message: 'Creating fail'})
    },
    Update(req, res){
            
    },
    async PassengerFindTrip(req, res){
        const trip_found_list = await tripService.PassengerFindTrip(req.body)        
        return res.status(200).json({code:StatusCode.OK, trip_found_list})
    }
}

module.exports = TripController;
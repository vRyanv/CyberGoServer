const {TripService} = require('../services')
const {StatusCode} = require("../constant");

const TripController = {
    TripList(req, res){

    },
    async Create(req, res){
        const {trip, destinations} = await TripService.Create(req)
        console.log(trip);
        console.log(destinations);
        if(trip){
            return res.status(200).json({code: StatusCode.CREATED, trip, destinations, message: 'Created successfully'})
        }
        return res.status(200).json({code: StatusCode.BAD_REQUEST, message: 'Creating fail'})
    },
    Update(req, res){
            
    },
}

module.exports = TripController;
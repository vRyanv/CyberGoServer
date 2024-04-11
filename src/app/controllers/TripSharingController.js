const {TripSharingService} = require('../services')
const {StatusCode} = require("../constant");

const TripSharingController = {
    TripList(req, res){

    },
    async Create(req, res){
        const trip_sharing = await TripSharingService.Create(req)
        if(trip_sharing){
            return res.status(200).json({code: StatusCode.CREATED, trip_sharing, message: 'Created successfully'})
        }
        return res.status(200).json({code: StatusCode.BAD_REQUEST, trip_sharing, message: 'Creating fail'})
    },
    Update(req, res){

    },
}

module.exports = TripSharingController;
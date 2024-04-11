const {TripSharingService} = require('../services')
const {StatusCode} = require("../constant");

const TripSharingController = {
    async Create(req, res){
        const trip_sharing = await TripSharingService.Create()
        if(trip_sharing){
            return res.status(200).json({code: StatusCode.CREATED, trip_sharing, message: 'Created successfully'})
        }
        return res.status(200).json({code: StatusCode.BAD_REQUEST, trip_sharing, message: 'Creating fail'})
    },
    Update(){

    },
}

module.exports = TripSharingController;
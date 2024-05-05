const {TripService} = require('../services')
const {StatusCode} = require("../constant");

const TripController = {
    async TripList(req, res) {
        const user_id = req.user.id
        const {shared_trip_list, join_trip_list} = await TripService.GetTripList(user_id);
        console.log("shared_trip_managent", shared_trip_list)
        console.log("join_trip_managent", join_trip_list)
        res.status(200).json({code: StatusCode.OK, shared_trip_list, join_trip_list})
    },
    async Create(req, res) {
        const trip = await TripService.Create(req)
        if (trip) {
            return res.status(200).json({code: StatusCode.CREATED, trip, message: 'Created successfully'})
        }
        return res.status(200).json({code: StatusCode.BAD_REQUEST, message: 'Creating fail'})
    },
    UpdateStatus(req, res) {
        console.log("UpdateStatus body: ", req.body)
        const user_id = req.user.id
        const {trip_id,status} = req.body
        TripService.UpdateTripStatus(user_id, trip_id, status)
            .then(result => {
                if (result) {
                    return res.status(200).json({code: StatusCode.OK, status})
                }
                return res.status(200).json({code: StatusCode.BAD_REQUEST})
            }).catch(error => {
            console.log("TripService.UpdateTripStatus: ", error)
            return res.status(200).json({code: StatusCode.BAD_REQUEST})
        })
    },
    async PassengerFindTrip(req, res) {
        const trip_found_list = await TripService.PassengerFindTrip(req.body)
        return res.status(200).json({code: StatusCode.OK, trip_found_list})
    }
}

module.exports = TripController;
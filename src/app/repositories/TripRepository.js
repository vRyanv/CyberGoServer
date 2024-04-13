const {Trip} = require("../schemas");

const TripRepository = {
    Create(trip_sharing) {
        return Trip.create(trip_sharing)
    },
}

module.exports = TripRepository
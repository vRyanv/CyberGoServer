const {Trip} = require("../schemas");
const {MemberStatus} = require("../constant");
const TripRepository = {
    Create(trip_sharing) {
        return Trip.create(trip_sharing)
    },
    FindAllTrip(){
        return Trip.find({})
        .populate('destinations')
        .populate('trip_owner')
        .populate({
            path: 'members',
            populate: 'user',
            match: {status:MemberStatus.ACCEPTED}
        })
        .populate('vehicle').lean()
    }
}

module.exports = TripRepository
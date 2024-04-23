const {Trip} = require("../schemas");
const {MemberStatus, TripStatus} = require("../constant");
const TripRepository = {
    Create(trip_sharing) {
        return Trip.create(trip_sharing)
    },
    FindTripOpening(target_date){
        return Trip.find({status:TripStatus.OPENING, start_date:target_date})
        .populate('destinations')
        .populate('trip_owner')
        .populate({
            path: 'members',
            populate: 'user',
            match: {status:MemberStatus.ACCEPTED}
        })
        .populate('vehicle').lean()
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
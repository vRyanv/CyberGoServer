const {Trip} = require("../schemas");
const {MemberStatus, TripStatus} = require("../constant");
const TripRepository = {
    UpdateStatus(user_id, trip_id, status){
        return Trip.updateOne(
            {trip_owner:user_id,_id:trip_id},
            {status}
            )
    },
    GetTripList(){
        return Trip.find({})
        .populate('trip_owner')
        .populate('destinations')
        .populate('vehicle')
        .populate({
            path: 'members',
            populate: 'user'
        })
        .sort({createdAt: 'desc'})
        .lean()
    },
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
        .populate('vehicle').sort({createdAt: 'desc'}).lean()
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
        .populate('vehicle').sort({createdAt: 'desc'}).lean()
    }
}

module.exports = TripRepository
const {Trip, Member} = require('../schemas')

const MemberRepository = {
    async InsertMemberToTrip(trip_id, member){
        const new_member = await Member.create(member)
        const trip = await Trip.findOneAndUpdate(
            {_id:trip_id},
            {$push: {members: new_member._id.toString()}}
        ).populate('destinations')
        .populate('members').lean()
        return trip;
    }
}

module.exports = MemberRepository
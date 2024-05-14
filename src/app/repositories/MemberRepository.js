const { MemberStatus } = require('../constant')
const {Trip, Member} = require('../schemas')

const MemberRepository = {
    RemoveById(member_id){
        return Member.deleteOne({_id: member_id})
    },
    RemoveMemberRequest(member_id){
        return Member.findByIdAndDelete(member_id).populate('user').lean()
    },
    UpdateMemberJoinedStatus(member_id){
        return Member.updateOne(
            {_id: member_id},
             {status: MemberStatus.JOINED}
            )
    },
    async InsertMemberToTrip(trip_id, member){
        const new_member = await Member.create(member)
        const trip = await Trip.findOneAndUpdate(
            {_id:trip_id},
            {$push: {members: new_member._id.toString()}}
        ).populate('destinations')
        .populate('trip_owner')
        .populate('members').lean()
        return trip;
    }
}

module.exports = MemberRepository
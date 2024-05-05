const {MemberRepository} = require('../repositories')
const { Helper } = require('../utils')
const {MemberStatus} =require('../constant')
const MemberService = {
    async MemberRequestToJoinTrip(user_id, body){
        const trip_id = body.trip_id
        const member = {
            user: user_id,
            origin: body.origin,
            destination: body.destination,
            geometry: body.geometry,
            status: MemberStatus.QUEUE
        }
        try{
            const trip = await MemberRepository.InsertMemberToTrip(trip_id, member)
            trip.members.map(member => {
                member.createdAt = member.createdAt.getTime()
            })
            trip.start_date = Helper.DatePadStart(trip.start_date);
            return trip;
        } catch(error){
            console.log(error);
            return false
        }
        
    }
}

module.exports = MemberService
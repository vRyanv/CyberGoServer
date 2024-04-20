const {StatusCode} = require('../constant')
const {MemberService} = require('../services')
const MemberController = {
    async RequestToJoinAction(req, res){
        const user_id = req.user.id
        const trip = await MemberService.MemberRequestToJoinTrip(user_id, req.body)
        console.log(trip);
        if(trip){
            return res.status(200).json({code: StatusCode.OK, trip, message: "request to join is successfully"})
        }
        return res.status(200).json({code: StatusCode.BAD_REQUEST, message: "BAD_REQUEST"})
    }
}

module.exports = MemberController
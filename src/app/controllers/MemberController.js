const {StatusCode, MemberStatus} = require('../constant')
const {MemberService} = require('../services')
const MemberController = {
    MemberLeaveTripAction(req, res){
        MemberService.MemberLeaveTrip(req.user, req.body)
        .then(result => {
            if(result){
                return res.status(200).json({code: StatusCode.UPDATED})
            }
            return res.status(200).json({code: StatusCode.BAD_REQUEST, message: "BAD_REQUEST"})
        })
    },
    UpdateMemeberStatusAction(req, res){
        if(req.body.status == MemberStatus.JOINED){
            MemberService.AcceptMemberRequest(req.body)
            .then(result => {
                if(result){
                    return res.status(200).json({code: StatusCode.UPDATED, member_id: req.body.member.member_id, status: req.body.status})
                }
                return res.status(200).json({code: StatusCode.BAD_REQUEST})
            })
        } else {
            MemberService.DeniedMemberRequest(req.body)
            .then(result => {
                if(result){
                    return res.status(200).json({code: StatusCode.UPDATED,  member_id: req.body.member.member_id, status: req.body.status})
                }
                return res.status(200).json({code: StatusCode.BAD_REQUEST})
            })
        }
       
    },
    async RequestToJoinAction(req, res){
        const user_id = req.user.id
        let trip = await MemberService.MemberRequestToJoinTrip(user_id, req.body)
        console.log(trip);
        if(trip){
            return res.status(200).json({code: StatusCode.OK, trip, message: "request to join is successfully"})
        }
        return res.status(200).json({code: StatusCode.BAD_REQUEST, message: "BAD_REQUEST"})
    }
}

module.exports = MemberController
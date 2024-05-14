const { StatusCode } = require('../constant')
const  {RatingService}  = require('../services')
const RatingController = {
    List(req, res){
        const {user_id} = req.params
        RatingService.GetRatingList(user_id)
        .then(rating_list =>{
            if(rating_list){
                return res.status(200).json({code: StatusCode.OK, rating_list})
            }
            return res.status(200).json({code: StatusCode.BAD_REQUEST})
        })
    },
    Create(req, res){
        RatingService.Create(req.user, req.body)
        .then(result =>{
            if(result){
                return res.status(200).json({code: StatusCode.CREATED})
            }
            return res.status(200).json({code: StatusCode.BAD_REQUEST})
        })
    }
}

module.exports = RatingController
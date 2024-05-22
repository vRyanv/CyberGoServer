const {Rating} = require('../schemas')

const RatingRepository = {
    GetAllRating(){
        return Rating.find({}).populate('user_receive').lean()
    },
    GetRatingList(user_id){
        return Rating.find({user_receive: user_id}).populate('user_send').sort({createdAt: 'desc'}).lean()
    },
    Create(rating){
        return Rating.create(rating)
    }
}

module.exports = RatingRepository
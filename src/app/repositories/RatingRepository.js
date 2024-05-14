const {Rating} = require('../schemas')

const RatingRepository = {
    GetratingList(user_id){
        return Rating.find({user_receive: user_id}).populate('user_send').sort({createdAt: 'desc'}).lean()
    },
    Create(rating){
        return Rating.create(rating)
    }
}

module.exports = RatingRepository
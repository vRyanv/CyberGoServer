const {RatingRepository, UserRepository} = require('../repositories')

const RatingService = {
    async GetRatingList(user_id){
        console.log(user_id)
        let rating_list = await RatingRepository.GetRatingList(user_id)
       
        rating_list = rating_list.map(rating => {
            return {
                ...rating,
                createdAt: rating.createdAt.getTime()
            }
        })
        console.log(rating_list);
        return rating_list;
    },
    async Create(user, body){
        const {
            user_receive,
            star,
            comment
        } =  body

        const Rating = {
            user_send: user.id,
            user_receive,
            star,
            comment
        }

        await RatingRepository.Create(Rating)
        const rating_list = await RatingRepository.GetRatingList(user_receive)

        try{
            let total_star = 0
            rating_list.map(rating => {  
                total_star += rating.star 
            });
            const update_star = total_star / rating_list.length
            await UserRepository.UpdateUserInformation(user_receive,{rating: update_star})
            return true
        } catch(error){
            console.log(error)
            return false
        }

    }
}

module.exports = RatingService
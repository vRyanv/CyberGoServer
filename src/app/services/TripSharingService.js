const tripSharingService = {
    Create(req){
        const user_id = req.body.user_id;
        const trip_sharing = {
            trip_owner: user_id,
            ...body
        }
    },
    Update(){

    },
}

module.exports = tripSharingService
const {Destination} = require("../schemas");

const DestinationRepository = {
    DeleteMany(des_ids){
        return Destination.deleteMany({ _id: { $in: des_ids } })
    },
    Update(des_id, update_des){
        return Destination.updateOne({_id: des_id}, update_des)
    },
    Create(destinations){
        return Destination.create(destinations)
    }
}

module.exports = DestinationRepository
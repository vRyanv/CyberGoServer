const {Destination} = require("../schemas");

const DestinationRepository = {
    Update(des_id, update_des){
        console.log(des_id,update_des);
        return Destination.updateOne({_id: des_id}, update_des)
    },
    Create(destinations){
        return Destination.create(destinations)
    }
}

module.exports = DestinationRepository
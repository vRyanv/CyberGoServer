const {Destination} = require("../schemas");

const DestinationRepository = {
    Create(destinations){
        return Destination.create(destinations)
    }
}

module.exports = DestinationRepository
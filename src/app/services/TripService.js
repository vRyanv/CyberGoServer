const {TripRepository, DestinationRepository} = require('../repositories')

const tripService = {
    async Create(req){
        console.log(req.body);
        const user_id = req.user.id;
        const origin_city = req.body.trip.origin_city
        const origin_state = req.body.trip.origin_state
        const origin_county = req.body.trip.origin_county
        const origin_address = req.body.trip.origin_address
        const vehicle = req.body.trip.vehicle_id
        const start_date_time = new Date(req.body.trip.start_date_time)
        const price = req.body.trip.price
        const description = req.body.trip.description
        let trip = {
            trip_owner: user_id,
            origin_city,
            origin_state,
            origin_county,
            origin_address,
            vehicle,
            start_date_time,
            price,
            description
        }
        try{
            trip =  await TripRepository.Create(trip)
            console.log(trip);
            let destinations = req.body.destinations
            destinations.map(destination => {
                delete destination._id
                destination.trip = trip._id.toString()
            })

            console.log(destinations);
            destinations = await DestinationRepository.Create(destinations)
            return {trip, destinations}
        } catch(error){
            console.log(error);
            return false
        }
    },
    Update(){

    },
}

module.exports = tripService
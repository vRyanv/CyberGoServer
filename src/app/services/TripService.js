const {TripRepository, DestinationRepository, MemberRepository} = require('../repositories')
const {Helper} = require('../utils')
const tripService = {
    async Create(req){

        let {destinations} = req.body.trip
        destinations.map(des=>{
            delete des._id
        })
        const destinations_id = []
        try{
            destinations = await DestinationRepository.Create(destinations)
            destinations.map(des => {
                destinations_id.push(des._id.toString())
            })
        } catch(error){
            console.log(error);
            return false
        }
  

        const user_id = req.user.id;
        const {
            name,
            origin_city,
            origin_state,
            origin_county,
            origin_address,
            origin_longitude,
            origin_latitude,
            destination_type,
            vehicle,
            start_date,
            start_time,
            price,
            description
        } = req.body.trip
        const start_date_time = start_date + " " + start_time
        let trip = {
            name,
            trip_owner: user_id,
            origin_city,
            origin_state,
            origin_county,
            origin_address,
            destinations: destinations_id,
            origin_longitude,
            origin_latitude,
            destination_type,
            vehicle,
            start_date_time: new Date(start_date_time),
            price,
            description
        }

        try{
            trip =  await TripRepository.Create(trip)
            trip.destinations = destinations
            return trip
        } catch(error){
            console.log(error);
            return false
        }
    },
    Update(){

    },
    async PassengerFindTrip(){
        const trip_list = await TripRepository.FindAllTrip()
        const trip_found_list = []
        console.log(trip_list)
        trip_list.map(trip => {
            const start_date = Helper.DatePadStart(trip.start_date_time)
            const start_time = Helper.TimePadStart(trip.start_date_time)
            const member_list = []
            trip.members.map(member => {
                member_list.push({
                    member_id: member._id.toString(),
                    user_id: member.user._id.toString(),
                    full_name: member.user.full_name,
                    avatar: member.user.avatar,
                    rating: member.user.rating
                })
            })
           
            const owner = {
                user_id: trip.trip_owner._id.toString(),
                avatar: trip.trip_owner.avatar,
                full_name: trip.trip_owner.full_name,
                rating:  trip.trip_owner.rating
            }
            const trip_found = {
                trip_id: trip._id.toString(),
                owner,
                trip_name: trip.name,
                vehicle_type: trip.vehicle.vehicle_type,
                start_date,
                start_time,
                price: trip.price,
                member_list,
                origin_city:trip.origin_city,
                origin_state:trip.origin_state,
                origin_county:trip.origin_county,
                destination_list: trip.destinations,
                destination_type: trip.destination_type,
                origin_address: trip.origin_address,
                description: trip.description,
                origin_longitude: trip.origin_longitude,
                origin_latitude: trip.origin_latitude,
            }
            trip_found_list.push(trip_found)
        })

        return trip_found_list
    }
}

module.exports = tripService
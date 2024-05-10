const {
    TripRepository,
    DestinationRepository,
    MemberRepository, NotificationRepository,
} = require("../repositories");
const MapService = require("./MapService");
const {Helper} = require("../utils");
const {SocketEvent, TripStatus, SystemDefault, NotificationType} = require("../constant");
const FCMService = require("./FCMService");

const tripService = {
    async UpdateTripLocation(user, body){
        console.log(body);
        const {
            trip_id,
            origin_longitude,
            origin_latitude,
            origin_city,
            origin_state,
            origin_county,
            origin_address,
            destination
        } = body
        const update_trip = {
            origin_longitude,
            origin_latitude,
            origin_city,
            origin_state,
            origin_county,
            origin_address,
        }

        const {
            _id,
            geometry,
            time,
            distance,
            city,
            state,
            county,
            address,
            longitude,
            latitude
        } = destination;
        const update_destination = {
            geometry,
            time,
            distance,
            city,
            state,
            county,
            address,
            longitude,
            latitude
        }
        try {
            const result_update_trip = TripRepository.UpdateInformation(user.id, trip_id, update_trip)
            const result_update_destination = DestinationRepository.Update(_id, update_destination)
            await Promise.all([result_update_trip,result_update_destination])
            return true
        } catch (error){
            console.log(error);
            return false
        }

    },
    async UpdateInformation(user, body){
        const trip_owner = user.id
        let {trip_id, price, start_date, start_time, trip_name, description} = body

        const update_trip = {
            price,
            start_time,
            name: trip_name,
            description,
        }

        if(start_date){
            update_trip.start_date = new Date(start_date)
        }

        try {
            return await TripRepository.UpdateInformation(trip_owner, trip_id, update_trip)
        } catch (error){
            console.log(error)
            return false
        }
    },
    async GetTripList(user_id) {
        const trip_list = await TripRepository.GetTripList(user_id)
        const shared_trip_list = []
        const join_trip_list = []

        trip_list.map(trip => {
            if (trip.trip_owner._id.toString() == user_id) {
                shared_trip_list.push(CreateTripResponse(trip))
            } else {
                for (const member of trip.members) {
                    if (member.user._id.toString() == user_id) {
                        join_trip_list.push(CreateTripResponse(trip))
                        break
                    }
                }
            }
        })

        function CreateTripResponse(trip) {
            const members = []
            trip.members.map(member => {
                members.push({
                    member_id: member._id.toString(),
                    user_id: member.user._id.toString(),
                    full_name: member.user.full_name,
                    avatar: member.user.avatar,
                    origin: member.origin,
                    destination: member.destination,
                    request_at: member.createdAt.getTime(),
                    status: member.status
                })
            })

            const trip_response = {
                trip_id: trip._id.toString(),
                trip_owner: {
                    user_id: trip.trip_owner._id.toString(),
                    full_name: trip.trip_owner.full_name,
                    avatar: trip.trip_owner.avatar,
                },
                trip_name: trip.name,
                destination_type: trip.destination_type,
                vehicle: {
                    id: trip.vehicle._id.toString(),
                    type: trip.vehicle.vehicle_type,
                    license_plates: trip.vehicle.license_plates,
                    front_vehicle: trip.vehicle.front_vehicle,
                    back_vehicle: trip.vehicle.back_vehicle,
                    right_vehicle: trip.vehicle.right_vehicle,
                    left_vehicle: trip.vehicle.left_vehicle
                },
                start_date: Helper.DatePadStart(trip.start_date),
                start_time: trip.start_time,
                price: trip.price,
                origin_longitude: trip.origin_longitude,
                origin_latitude: trip.origin_latitude,
                origin_city: trip.origin_city,
                origin_state: trip.origin_state,
                origin_county: trip.origin_county,
                origin_address: trip.origin_address,
                destinations: trip.destinations,
                members,
                trip_status: trip.status,
                description: trip.description
            }
            return trip_response
        }

        return {shared_trip_list, join_trip_list}
    },
    async Create(req) {
        let {destinations} = req.body.trip;
        destinations.map((des) => {
            delete des._id;
        });
        const destinations_id = [];
        try {
            destinations = await DestinationRepository.Create(destinations);
            destinations.map((des) => {
                destinations_id.push(des._id.toString());
            });
        } catch (error) {
            console.log(error);
            return false;
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
            description,
        } = req.body.trip;
        console.log(req.body.trip);
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
            start_date: new Date(start_date),
            start_time,
            price,
            description,
        };

        try {
            const new_trip = await TripRepository.Create(trip);
            trip._id = new_trip._id.toString();
            trip.destinations = destinations;
            trip.start_date = Helper.DatePadStart(new_trip.start_date);
            console.log(trip);
            return trip;
        } catch (error) {
            console.log(error);
            return false;
        }
    },
    async UpdateTripStatus(user, trip_id, status) {
        const PushNotification = (trip) => {
            if (status === TripStatus.FINISH) {
                const subject = "The trip was completed"
                const content = trip.name
                trip.members.map(async member => {
                    let notification = {
                        user: member.user._id.toString(),
                        title: subject,
                        avatar: trip.trip_owner.avatar,
                        content,
                        type: NotificationType.USER
                    }

                    notification = await NotificationRepository.CreateNotification(notification)
                    notification = {
                        _id: notification._id.toString(),
                        datetime: notification.createdAt.getTime().toString(),
                        avatar: notification.avatar,
                        title: notification.title,
                        content: notification.content,
                    }
                    FCMService.SendSingleNotification({...notification}, member.user.firebase_token)

                    PushSocket(member.user, trip_id)
                })
            }
        }

        const PushSocket = (user, trip_id) =>{
            console.log(user.online_status)
            if(!user.online_status){
                return
            }
            const socket = __user_sockets.get(user._id.toString())
            if (socket) {
                const trip_finish = {
                    trip_id,
                    status: TripStatus.FINISH
                }
                socket.emit(SocketEvent.TRIP_FINISH, JSON.stringify(trip_finish))
            }
        }

        const trip = await TripRepository.UpdateStatus(user.id, trip_id, status)
        if (trip) {
            console.log(trip.members);
            PushNotification(trip)
            return true
        } else {
            return false
        }
    },
    async PassengerFindTrip(user, body) {
        //get data
        let {
            origin_city,
            origin_state,
            origin_county,
            origin_address,
            start_date,
            route_match_percentage,
            geometry,
        } = body;
        origin_city = origin_city || "";
        origin_state = origin_state || "";
        origin_county = origin_county || "";

        if (origin_address) {
            origin_address = origin_address.split(",")[0] || "";
        }
        console.log("origin_address", origin_address)
        const target_date = new Date(start_date);

        //find all trip by start_date
        trip_list = await TripRepository.FindTripOpening(user.id, target_date);

        // location filter
        const trip_match_origin_list = [];
        trip_list.map((trip) => {
            console.log("trip.origin_address", trip.origin_address)
            if (
                origin_city.includes(trip.origin_city) ||
                origin_state.includes(trip.origin_state) ||
                origin_county.includes(trip.origin_county) ||
                trip.origin_address.includes(origin_address)
            ) {
                trip_match_origin_list.push(trip);
            } else {
                for (const des of trip.destinations) {
                    console.log("des.address", des.address)
                    if (
                        origin_city.includes(des.city) ||
                        origin_state.includes(des.state) ||
                        origin_county.includes(des.county) ||
                        des.address.includes(origin_address)
                    ) {
                        trip_match_origin_list.push(trip);
                        break;
                    }
                }
            }
        });

        // route filter
        const trip_match_route = [];
        trip_match_origin_list.map((trip) => {
            let destination_geomertry = "";
            for (const des of trip.destinations) {
                destination_geomertry += des.geometry;
            }
            const similarity_percentage = MapService.CompareRouteByGeometry(
                geometry,
                destination_geomertry
            );

            if (similarity_percentage >= route_match_percentage) {
                trip.route_match_percentage = similarity_percentage
                trip_match_route.push(trip);
            }
        });

        // init trip found list
        const trip_found_list = [];
        trip_match_route.map((trip) => {
            const start_date = Helper.DatePadStart(trip.start_date);
            const member_list = [];
            trip.members.map((member) => {
                member_list.push({
                    member_id: member._id.toString(),
                    user_id: member.user._id.toString(),
                    full_name: member.user.full_name,
                    avatar: member.user.avatar,
                    rating: member.user.rating,
                });
            });
            console.log(member_list);

            const owner = {
                user_id: trip.trip_owner._id.toString(),
                avatar: trip.trip_owner.avatar,
                full_name: trip.trip_owner.full_name,
                rating: trip.trip_owner.rating,
            };
            const trip_found = {
                trip_id: trip._id.toString(),
                owner,
                trip_name: trip.name,
                vehicle: {
                    id: trip.vehicle._id.toString(),
                    type: trip.vehicle.vehicle_type,
                    license_plates: trip.vehicle.license_plates,
                    front_vehicle: trip.vehicle.front_vehicle,
                    back_vehicle: trip.vehicle.back_vehicle,
                    right_vehicle: trip.vehicle.right_vehicle,
                    left_vehicle: trip.vehicle.left_vehicle
                },
                start_date,
                start_time: trip.start_time,
                price: trip.price,
                route_match_percentage: trip.route_match_percentage,
                member_list,
                origin_city: trip.origin_city,
                origin_state: trip.origin_state,
                origin_county: trip.origin_county,
                destination_list: trip.destinations,
                destination_type: trip.destination_type,
                origin_address: trip.origin_address,
                description: trip.description,
                origin_longitude: trip.origin_longitude,
                origin_latitude: trip.origin_latitude,
            };
            trip_found_list.push(trip_found);
        });
        console.log(trip_found_list)
        return trip_found_list;
    },
};

module.exports = tripService;

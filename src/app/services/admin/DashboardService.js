const {TripRepository, VehicleRepository, RatingRepository, UserRepository} = require("../../repositories");
const {VehicleType} = require("../../constant");
const DashboardService = {
    async GetGeneralStatistics() {
        const get_vehicle_count_task = VehicleRepository.CountVehicleAccepted()
        const get_trip_count_task = TripRepository.CountTripFinish()
        const get_user_count_task = UserRepository.CountAllUser()
        const result = await Promise.all([get_vehicle_count_task, get_trip_count_task, get_user_count_task])
        console.log(result[0])
        return {user: result[2], trip: result[1], vehicle: result[0]}
    },
    async GetRatingStatistics() {
        const ratings = await RatingRepository.GetAllRating()

        let rating_statistics = new Map()

        ratings.map(rating => {
            const email = rating.user_receive.email
            let star_quantity
            if (rating_statistics.has(email)) {
                star_quantity = rating_statistics.get(email)
                star_quantity += rating.star
            } else {
                star_quantity = rating.star
            }
            rating_statistics.set(email, star_quantity)
        })
        rating_statistics = Array.from(rating_statistics, ([name, value]) => ({name, value}));
        rating_statistics = rating_statistics.sort((a, b) => b.value - a.value)
        rating_statistics = rating_statistics.slice(0, 5)
        return rating_statistics
    },
    async GetTripStatistics(params) {
        let {from_date, to_date} = params
        from_date = new Date(from_date)
        to_date = new Date(to_date)
        const trips = await TripRepository.FindTripListStatistic(from_date, to_date)

        let moto = 0
        let car = 0
        let truck = 0
        trips.map(trip => {
            switch (trip.vehicle.vehicle_type) {
                case VehicleType.MOTO:
                    moto++;
                    break;
                case VehicleType.TRUCK:
                    truck++;
                    break;
                default:
                    car++
            }
        })
        return {
            moto,
            car,
            truck
        }
    },
    async GetVehicleStatistics(params) {
        let {from_date, to_date} = params
        from_date = new Date(from_date)
        to_date = new Date(to_date)
        const vehicles = await VehicleRepository.GetVehicleStatistic(from_date, to_date)
        let moto = 0
        let car = 0
        let truck = 0

        vehicles.map(vehicle => {
            switch (vehicle.vehicle_type) {
                case VehicleType.MOTO:
                    moto++;
                    break;
                case VehicleType.TRUCK:
                    truck++;
                    break;
                default:
                    car++
            }
        })
        return {
            moto,
            car,
            truck
        }
    }
}

module.exports = DashboardService
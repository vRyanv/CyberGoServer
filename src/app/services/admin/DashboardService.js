const {TripRepository, VehicleRepository} = require("../../repositories");
const {VehicleType} = require("../../constant");
const DashboardService = {
    async GetTripStatistics(params){
        let {from_date, to_date } = params
        from_date = new Date(from_date)
        to_date = new Date(to_date)
        const trips = await TripRepository.FindTripListStatistic(from_date, to_date)

        let moto = 0
        let car = 0
        let truck = 0
        trips.map(trip => {
            switch (trip.vehicle.vehicle_type){
                case VehicleType.MOTO: moto++; break;
                case VehicleType.TRUCK: truck++; break;
                default: car++
            }
        })
        return {
            moto,
            car,
            truck
        }
    },
    async GetVehicleStatistics(params){
        let {from_date, to_date } = params
        from_date = new Date(from_date)
        to_date = new Date(to_date)
        const vehicles = await VehicleRepository.GetVehicleStatistic(from_date, to_date)
        let moto = 0
        let car = 0
        let truck = 0

        vehicles.map(vehicle => {
            switch (vehicle.vehicle_type){
                case VehicleType.MOTO: moto++; break;
                case VehicleType.TRUCK: truck++; break;
                default: car++
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
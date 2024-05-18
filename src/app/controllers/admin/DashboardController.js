const {DashboardService} = require('../../services')
const {StatusCode} = require("../../constant");
const DashboardController = {
    GetTripStatisticsAction(req, res){
        DashboardService.GetTripStatistics(req.params)
            .then(trip_statistic => {
                return res.status(200).json({code: StatusCode.OK, trip_statistic})
            })
    },
    GetVehicleStatisticsAction(req, res){
        DashboardService.GetVehicleStatistics(req.params)
            .then(vehicle_statistic => {
                return res.status(200).json({code: StatusCode.OK, vehicle_statistic})
            })
    },
    GetGeneralStatisticsAction(req, res){

    }
}

module.exports = DashboardController
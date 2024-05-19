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
        DashboardService.GetGeneralStatistics()
            .then(general_statistic => {
                console.log(general_statistic)
                return res.status(200).json({code: StatusCode.OK, general_statistic})
            })
    },
    GetRatingStatisticsAction(req, res){
        DashboardService.GetRatingStatistics()
            .then(rating_statistic => {
                console.log(rating_statistic)
                return res.status(200).json({code: StatusCode.OK, rating_statistic})
            })
    }
}

module.exports = DashboardController
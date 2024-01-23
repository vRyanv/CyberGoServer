const {BAD_REQUEST} = require('../../constant/status-code');
const mapService = require('../../services/map.service')
module.exports =  {
    async getGetAddressAction(req, res) {
        let lat = req.body.lat
        let long = req.body.long
        let errors = []
        if(lat !== undefined || lat.trim().length === 0){
            errors.push("Latitude is required")
        }
        if(long !== undefined || long.trim().length === 0){
            errors.push("Longitude is required")
        }
        if(errors.length !== 0) {
            res.status(200).json({code: BAD_REQUEST, errors})
        } else{
            let address_result = await mapService.ReverseGeoCoding(lat, long)
            if(address_result.data.error === undefined){
                res.status(200).json({code: 200, message: 'login success', token})
            }

        }
    }
}

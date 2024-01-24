const {BAD_REQUEST, OK, NOT_FOUND} = require('../constant/status-code');
const mapService = require('../services/map.service')
module.exports =  {
    async getGetAddressAction(req, res) {
        console.log(req.params)
        let lat = req.params.lat
        let long = req.params.long
        let errors = []
        if(lat === undefined || lat.trim().length === 0){
            errors.push("Latitude is required")
        }
        if(long === undefined || long.trim().length === 0){
            errors.push("Longitude is required")
        }
        if(errors.length !== 0) {
            return res.status(200).json({code: BAD_REQUEST, errors})
        } else{
            let address_result = await mapService.ReverseGeoCoding(lat, long)
            if(address_result.code === BAD_REQUEST){
                return res.status(200).json({code: BAD_REQUEST, errors: address_result.message})
            }
            return res.status(200).json({address_result})
            if(address_result.response.status === BAD_REQUEST){
                return res.status(200).json({code: BAD_REQUEST, errors})
            }
            if(address_result.data.error !== undefined){
                return res.status(200).json({code: NOT_FOUND, message:address_result.data.error})
            } else {
                res.status(200).json({
                    code: OK,
                    name: address_result.data.name,
                    address_type: address_result.data.addresstype,
                    display_name: address_result.data.display_name,
                    address: {
                        city: address_result.data.address.country,
                        county: address_result.data.address.country,
                        state: address_result.data.address.state,
                        country: address_result.data.address.country,
                        country_code: address_result.data.address.country_code
                    },
                    boundingbox:address_result.data.boundingbox
                })
            }
        }
    }
}

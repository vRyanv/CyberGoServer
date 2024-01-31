const mapService = require('../services/map.service')
module.exports =  {
    async getAddressAction(req, res) {
        const lat = req.params.lat
        const lng = req.params.lng
        const result = await mapService.ReverseGeoCoding(lat, lng);
        return res.status(200).json(result)
    },
    async searchAddressAction(req, res){
        const address = req.params.address
        const limit = req.params.limit
        const result = await mapService.SearchAddress(address, limit);
        return res.status(200).json(result)
    }
}

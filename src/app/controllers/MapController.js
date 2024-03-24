const {MapService} = require('../services')
const MapController =  {
    async getAddressAction(req, res) {
        const lat = req.params.lat
        const lng = req.params.lng
        const result = await MapService.ReverseGeoCoding(lat, lng);
        return res.status(200).json(result)
    },
    async searchAddressAction(req, res){
        const address = req.params.address
        const limit = req.params.limit
        const result = await MapService.SearchAddress(address, limit);
        return res.status(200).json(result)
    }
}

module.exports = MapController

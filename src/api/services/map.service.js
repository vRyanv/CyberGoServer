const axios = require('axios');

const mapService = {
    ReverseGeoCoding: async (lat, long)=>{
        const options = {
            method: 'GET',
            url: `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${long}`
        };
        try {
            return await axios.request(options);
        } catch (error) {
            console.error(error);
            return null;
        }
    }
}

module.exports = mapService;
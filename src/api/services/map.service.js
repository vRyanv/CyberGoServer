const axios = require('axios');
const {VN, EN} = require("../constant/language-code");
const {BAD_REQUEST, NOT_FOUND, OK} = require("../constant/status-code");

const mapService = {
    ReverseGeoCoding: async (lat, lng) => {
        const errors = []
        if (lat === undefined || lat.length === 0) {
            errors.push("Latitude is required")
        }
        if (lng === undefined || lng.length === 0) {
            errors.push("Longitude is required")
        }
        if (errors.length > 0) {
            return {code: BAD_REQUEST, errors}
        }

        const options = {
            method: 'GET',
            header: {'Accept-Language': EN},
            url: `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`
        };

        try {
            const address_result = await axios.request(options);
            if (address_result.code === BAD_REQUEST) {
                return {code: BAD_REQUEST, errors: address_result.message}
            }
            if (address_result.data.error !== undefined) {
                return {code: NOT_FOUND, message: address_result.data.error}
            }
            return {
                code: OK,
                lat,
                lng,
                name: address_result.data.name,
                address_type: address_result.data.addresstype,
                display_name: address_result.data.display_name,
                address: {
                    city: address_result.data.address.city,
                    quarter: address_result.data.address.quarter,
                    district: address_result.data.address.district,
                    county: address_result.data.address.county,
                    state: address_result.data.address.state,
                    country: address_result.data.address.country,
                    country_code: address_result.data.address.country_code
                },
                boundingbox: address_result.data.boundingbox.map(Number)
            }
        } catch (errors) {
            return {code: BAD_REQUEST, errors}
        }
    },
    SearchAddress: async (address, limit) => {
        const errors = []
        if (address === undefined || address.trim().length === 0) {
            errors.push("Address is required")
        }

        limit = Number(limit)
        if (limit === undefined) {
            errors.push("Limit is required must be greater than 0")
        } else if (isNaN(limit)) {
            errors.push("Limit must be a number")
        } else if (limit <= 0 || limit > 40) {
            errors.push("The required limit must be greater than 0 and the maximum is 40")
        }

        if (errors.length > 0) {
            return {code: BAD_REQUEST, errors}
        }

        const options = {
            header: {'Accept-Language': VN},
            method: 'GET',
            url: `https://nominatim.openstreetmap.org/search?q=${address}&format=json&addressdetails=1&limit=${limit}`
        }
        try {
            const address_result = await axios.request(options);

            if (address_result.code === BAD_REQUEST) {
                return {code: BAD_REQUEST, errors: address_result.message}
            }
            if (address_result.data.error !== undefined) {
                return {code: NOT_FOUND, message: address_result.data.error}
            }
            if (address_result.data.length === 0) {
                return {code: NOT_FOUND, message: 'Not found any address'}
            }
            const address_list = []

            address_result.data.map(address_info => {
                address_list.push({
                    code: OK,
                    lat: address_info.lat,
                    lng: address_info.lon,
                    name: address_info.name,
                    address_type: address_info.addresstype,
                    display_name: address_info.display_name,
                    address: {
                        road: address_info.address.road,
                        city: address_info.address.city,
                        quarter: address_info.address.quarter,
                        district: address_info.address.district,
                        county: address_info.address.county,
                        state: address_info.address.state,
                        country: address_info.address.country,
                        country_code: address_info.address.country_code
                    },
                    boundingbox: address_info.boundingbox.map(Number)
                })
            })
            return address_list;
        } catch (errors) {
            return {code: BAD_REQUEST, errors}
        }
    },
}

module.exports = mapService;
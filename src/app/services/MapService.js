const axios = require('axios');
const {StatusCode, LanguageCode} = require('../constant');

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
            return {code: StatusCode.BAD_REQUEST, errors}
        }

        const options = {
            method: 'GET',
            header: {'Accept-Language': LanguageCode.EN},
            url: `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`
        };

        try {
            const address_result = await axios.request(options);
            if (address_result.code === StatusCode.BAD_REQUEST) {
                return {code: StatusCode.BAD_REQUEST, errors: address_result.message}
            }
            if (address_result.data.error !== undefined) {
                return {code: StatusCode.NOT_FOUND, message: address_result.data.error}
            }

            return {
                code: StatusCode.OK,
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
            return {code: StatusCode.BAD_REQUEST, errors}
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
            return {code: StatusCode.BAD_REQUEST, errors}
        }

        const options = {
            header: {'Accept-Language': LanguageCode.VN},
            method: 'GET',
            url: `https://nominatim.openstreetmap.org/search?q=${address}&format=json&addressdetails=1&limit=${limit}`
        }
        try {
            const address_result = await axios.request(options);

            if (address_result.code === StatusCode.BAD_REQUEST) {
                return {code: StatusCode.BAD_REQUEST, errors: address_result.message}
            }
            if (address_result.data.error !== undefined) {
                return {code: StatusCode.NOT_FOUND, message: address_result.data.error}
            }
            if (address_result.data.length === 0) {
                return {code: StatusCode.NOT_FOUND, message: 'Not found any address'}
            }
            const address_list = []

            address_result.data.map(address_info => {
                address_list.push({
                    code: StatusCode.OK,
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
            return {code: StatusCode.BAD_REQUEST, errors}
        }
    },
    CompareRouteByGeometry(){
        function levenshteinDistance(s1, s2) {
            const len_s1 = s1.length;
            const len_s2 = s2.length;

            // Tạo một ma trận để lưu trữ khoảng cách Levenshtein
            const matrix = Array.from(Array(len_s1 + 1), () => Array(len_s2 + 1).fill(0));

            // Khởi tạo ma trận với các giá trị ban đầu
            for (let i = 0; i <= len_s1; i++) {
                matrix[i][0] = i;
            }
            for (let j = 0; j <= len_s2; j++) {
                matrix[0][j] = j;
            }

            // Điền vào ma trận với giá trị tối ưu
            for (let i = 1; i <= len_s1; i++) {
                for (let j = 1; j <= len_s2; j++) {
                    const cost = s1[i - 1] === s2[j - 1] ? 0 : 1;
                    matrix[i][j] = Math.min(
                        matrix[i - 1][j] + 1,      // Xóa
                        matrix[i][j - 1] + 1,      // Thêm
                        matrix[i - 1][j - 1] + cost // Thay đổi hoặc giữ nguyên
                    );
                }
            }

            // Trả về khoảng cách Levenshtein cuối cùng
            return matrix[len_s1][len_s2];
        }

// Chuỗi mẫu
        const s1 = "mjebRoqgwhEbPw\vu@qeCtDoLrAwFuGaBis@kRyEoA_RsEsLwAaTUcLnBeS~Dkc@vIwDp@}sAbWuq@hMiKlBip@pLqo@jLa[zF__@lFqj@bHmBTuN|AcGd@oF^_P|@csFnVyLz@sLrAos@nKs@Jan@|Ioc@bGaEj@oi@`HahAcpAeFnGzRdUxh@xm@lAtAtFbH";
        const s2 = "cqpbRsikwhE|_BsXjKiB_BgJiKlBip@pLqo@jLa[zF__@lFqj@bHmBTuN|AcGd@oF^_P|@csFnVyLz@sLrAos@nKs@Jan@|Ioc@bGaEj@oi@`HahAcpAsKuL{Xa[kKsLqH{IgJuJmJ{J";


// Tính toán và in ra tỉ lệ trùng khớp giữa hai chuỗi
        const distance = levenshteinDistance(s1, s2);
        const similarity = 1 - (distance / Math.max(s1.length, s2.length));
        console.log("Tỉ lệ trùng khớp giữa hai chuỗi:", similarity);
    }
}

module.exports = mapService;
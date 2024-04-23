const axios = require("axios");
const { StatusCode, LanguageCode } = require("../constant");

const MapService = {
  ReverseGeoCoding: async (lat, lng) => {
    const errors = [];
    if (lat === undefined || lat.length === 0) {
      errors.push("Latitude is required");
    }
    if (lng === undefined || lng.length === 0) {
      errors.push("Longitude is required");
    }
    if (errors.length > 0) {
      return { code: StatusCode.BAD_REQUEST, errors };
    }

    const options = {
      method: "GET",
      header: { "Accept-Language": LanguageCode.EN },
      url: `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`,
    };

    try {
      const address_result = await axios.request(options);
      if (address_result.code === StatusCode.BAD_REQUEST) {
        return { code: StatusCode.BAD_REQUEST, errors: address_result.message };
      }
      if (address_result.data.error !== undefined) {
        return {
          code: StatusCode.NOT_FOUND,
          message: address_result.data.error,
        };
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
          country_code: address_result.data.address.country_code,
        },
        boundingbox: address_result.data.boundingbox.map(Number),
      };
    } catch (errors) {
      return { code: StatusCode.BAD_REQUEST, errors };
    }
  },
  SearchAddress: async (address, limit) => {
    const errors = [];
    if (address === undefined || address.trim().length === 0) {
      errors.push("Address is required");
    }

    limit = Number(limit);
    if (limit === undefined) {
      errors.push("Limit is required must be greater than 0");
    } else if (isNaN(limit)) {
      errors.push("Limit must be a number");
    } else if (limit <= 0 || limit > 40) {
      errors.push(
        "The required limit must be greater than 0 and the maximum is 40"
      );
    }

    if (errors.length > 0) {
      return { code: StatusCode.BAD_REQUEST, errors };
    }

    const options = {
      header: { "Accept-Language": LanguageCode.VN },
      method: "GET",
      url: `https://nominatim.openstreetmap.org/search?q=${address}&format=json&addressdetails=1&limit=${limit}`,
    };
    try {
      const address_result = await axios.request(options);

      if (address_result.code === StatusCode.BAD_REQUEST) {
        return { code: StatusCode.BAD_REQUEST, errors: address_result.message };
      }
      if (address_result.data.error !== undefined) {
        return {
          code: StatusCode.NOT_FOUND,
          message: address_result.data.error,
        };
      }
      if (address_result.data.length === 0) {
        return { code: StatusCode.NOT_FOUND, message: "Not found any address" };
      }
      const address_list = [];

      address_result.data.map((address_info) => {
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
            country_code: address_info.address.country_code,
          },
          boundingbox: address_info.boundingbox.map(Number),
        });
      });
      return address_list;
    } catch (errors) {
      return { code: StatusCode.BAD_REQUEST, errors };
    }
  },
  CompareRouteByGeometry(geometry_1, geometry_2) {
    // Function to split a string into chunks
    function splitStringIntoChunks(string, chunkSize) {
      const chunks = [];
      for (let i = 0; i < string.length; i += chunkSize) {
        chunks.push(string.slice(i, i + chunkSize));
      }
      return chunks;
    }

    // Function to calculate Levenshtein Distance between two strings
    function levenshteinDistance(str1, str2) {
      const m = str1.length;
      const n = str2.length;
      const dp = Array.from(Array(m + 1), () => Array(n + 1).fill(0));

      for (let i = 0; i <= m; i++) {
        for (let j = 0; j <= n; j++) {
          if (i === 0) {
            dp[i][j] = j;
          } else if (j === 0) {
            dp[i][j] = i;
          } else {
            const cost = str1[i - 1] === str2[j - 1] ? 0 : 1;
            dp[i][j] = Math.min(
              dp[i - 1][j] + 1,
              dp[i][j - 1] + 1,
              dp[i - 1][j - 1] + cost
            );
          }
        }
      }

      return dp[m][n];
    }

    // Function to compare two geometries
    function compareGeometries(geometry1, geometry2, chunkSize = 1000) {
      const chunks1 = splitStringIntoChunks(geometry1, chunkSize);
      const chunks2 = splitStringIntoChunks(geometry2, chunkSize);
      let totalDistance = 0;
      for (let i = 0; i < chunks1.length; i++) {
        const chunk1 = chunks1[i] || '';
        const chunk2 = chunks2[i] || '';
        totalDistance += levenshteinDistance(chunk1, chunk2);
      }

      totalDistance

      const totalLength = Math.max(geometry1.length, geometry2.length);
      // Assuming a higher distance means less similarity, you can adjust this according to your needs
      const similarity = 1 - totalDistance / totalLength;
      return similarity;
    }

    return compareGeometries(geometry_1, geometry_2)
  },
};

module.exports = MapService;

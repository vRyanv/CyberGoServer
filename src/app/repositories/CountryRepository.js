const {Country} = require("../schemas");

const CountryRepository = {
    async FindCountryByPrefix(prefix){
        return Country.findOne({prefix}).exec()
    }
}

module.exports = CountryRepository
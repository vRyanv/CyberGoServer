const {Country} = require("../schemas");

class CountryRepository{
    async FindCountryByPrefix(prefix){
        return Country.findOne({prefix}).exec()
    }
}

module.exports = new CountryRepository
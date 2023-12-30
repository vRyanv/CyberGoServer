const countrySchema = require("./schema/country.schema");
const mongoose = require("mongoose");
const {models} = require("mongoose");
const Country = mongoose.model("Country", countrySchema);

class CountryRepository{
    async getCountryByPrefix(prefix){
        return Country.findOne({prefix}).exec()
    }
}

module.exports = new CountryRepository
const {CountrySchema} = require("../schemas");
const mongoose = require("mongoose");
const Country = mongoose.model("Country", CountrySchema);

class CountryRepository{
    async FindCountryByPrefix(prefix){
        return Country.findOne({prefix}).exec()
    }
}

module.exports = new CountryRepository
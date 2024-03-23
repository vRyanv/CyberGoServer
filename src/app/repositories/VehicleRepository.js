const {VehicleSchema} = require("../schemas");
const mongoose = require("mongoose");
const Vehicle = mongoose.model("Vehicle", VehicleSchema);


module.exports = {
    CreateDriverRegistration(vehicle){
        return Vehicle.create(vehicle)
    }
}
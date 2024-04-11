const mongoose = require('mongoose')
const {DOUBLE} = require("sequelize");
const Schema = mongoose.Schema
const RoadSectionSchema = new Schema({
    geometry: {type:String, required:true},
    time: {type:String, required:true},
    distance: {type:String, required:true},
    location: {
        destination_longitude: {type: DOUBLE, required:true},
        destination_latitude: {type: DOUBLE, required:true},
        destination_address: {type: String, required:true}
    },
}, {timestamps:true})
module.exports = mongoose.model("RoadSection", RoadSectionSchema);
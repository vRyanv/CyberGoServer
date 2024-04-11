const mongoose = require('mongoose')
const {DOUBLE} = require("sequelize");
const Schema = mongoose.Schema
const TripSharingSchema = new Schema({
    trip_owner: {
        type: Schema.ObjectId,
        ref: 'User',
        required: true
    },
    origin_city: {type:String, required:true},
    origin_state: {type:String, required:true},
    origin_county: {type:String, required:true},
    origin_address: {type:String, required: true},
    road_section: [{
        type: Schema.ObjectId,
        ref: 'RoadSection',
        required: true
    }],
    vehicle: {
        type: Schema.ObjectId,
        ref: 'Vehicle',
        required: true
    },
    start_date_time: {type:Date, required: true},
    price: {type:DOUBLE, required: true},
    description: {type:String, required:false},
}, {timestamps:true})
module.exports = mongoose.model("TripSharingSchema", TripSharingSchema);
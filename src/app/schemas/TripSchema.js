const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const {TripStatus} = require('../constant')

const TripSchema = new Schema(
    {
        name: {type: String, required: false},
        trip_owner: {
            type: Schema.ObjectId,
            ref: "User",
            required: true,
        },
        origin_city: {type: String, required: false},
        origin_state: {type: String, required: false},
        origin_county: {type: String, required: false},
        origin_address: {type: String, required: true},
        origin_longitude: {type: Number, required: true},
        origin_latitude: {type: Number, required: true},
        destination_type: {type: String, required: true},
        members: [{
            type: Schema.ObjectId,
            ref: "Member",
            required: true,
        }],
        destinations: [{
            type: Schema.ObjectId,
            ref: "Destination",
            required: true,
        }],
        vehicle: {
            type: Schema.ObjectId,
            ref: "Vehicle",
            required: true,
        },
        start_date: {type: Date, required: true},
        start_time: {type: String, required: true },
        price: {type: Number, required: true},
        description: {type: String, required: false},
        status: {type:String, default: TripStatus.OPENING}
    },
    {timestamps: true}
);
module.exports = mongoose.model("Trip", TripSchema);

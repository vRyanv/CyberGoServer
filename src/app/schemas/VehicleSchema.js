const mongoose = require('mongoose')
const Schema = mongoose.Schema

const {VehicleStatus} = require('../constant')

const VehicleSchema = new Schema({
    driver: {
        type: Schema.ObjectId,
        ref: 'User',
        required: true
    },
    vehicle_type: {type: String, required: true},
    license_plates: {type: String, required: true},
    registration_date: {type: Date, required: true},
    front_vehicle_registration_certificate: {type: String, required: true},
    back_vehicle_registration_certificate: {type: String, required: true},
    front_driving_licence: {type: String, required: true},
    back_driving_licence: {type: String, required: true},
    front_vehicle: {type: String, required: true},
    back_vehicle: {type: String, required: true},
    right_vehicle: {type: String, required: true},
    left_vehicle: {type: String, required: true},
    status: {type: String, default: VehicleStatus.QUEUE},
}, {timestamps: true})

module.exports = mongoose.model("Vehicle", VehicleSchema);
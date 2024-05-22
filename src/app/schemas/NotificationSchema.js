const mongoose = require('mongoose')
const Schema = mongoose.Schema
const NotificationSchema = new Schema({
    user: {
        type: Schema.ObjectId,
        ref: 'User',
        required: true
    },
    title: {type: String, required: true},
    avatar: {type: String, required: true},
    content: {type: String, required: true},
    type: {type: String, required: true},
    vehicle: {
        type: Schema.ObjectId,
        ref: 'Vehicle',
        required: false
    },
}, {timestamps: true})
module.exports = mongoose.model("Notification", NotificationSchema);
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const {Role, AccountStatus, DEFAULT_AVATAR} = require('../constant')

const UserSchema = new Schema({
    email: {type: String, required: true},
    password: {type: String, minLength: 8, required: true},
    gender: {type: String, required: true},
    full_name: {type: String, maxLength: 50, required: true},
    phone_number: {type: String, required: true},
    country: {type: Schema.ObjectId, ref: 'Country', required: true},
    avatar: {type: String, default: DEFAULT_AVATAR},
    rating: {type:Number, default:0},
    address: {type: String, required: false},
    id_number: {type: String, default: ""},
    front_id_card: {type: String, default: ""},
    back_id_card: {type: String, default: ""},
    birthday: {type: String, default: ""},
    online_status: {type: Boolean, default: false},
    role: {type: String, default: Role.USER},
    otp_code: {type: Number, maxLength: 6},
    account_status: {type: String, default: AccountStatus.VERIFY},
    firebase_token: {type: String, required: false}
}, {timestamps: true})

module.exports = mongoose.model("User", UserSchema);
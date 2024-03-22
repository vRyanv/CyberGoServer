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
    address: {type: String, required: false},
    id_number: {type: String, default: ""},
    front_id_card: {type: String, default: ""},
    back_id_card: {type: String, default: ""},
    birthday: {type: Date, required: true},
    online_status: {type: Boolean, default: false},
    roles: {type: String, default: Role.USER},
    otp_code: {type: Number, maxLength: 6},
    account_status: {type: String, default: AccountStatus.VERIFY}
}, {timestamps: true})

module.exports = UserSchema
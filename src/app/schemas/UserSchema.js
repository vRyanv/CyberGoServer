const mongoose = require('mongoose')
const Schema = mongoose.Schema

const {Role, AccountStatus, DEFAULT_AVATAR} = require('../constant')

const UserSchema = new Schema({
    email: {type: String, required: true},
    password: {type: String, minLength: 8, required: true},
    gender: {type: Number, required: true}, //1 = male | 2 = female | 3 = other
    full_name: {type: String, maxLength: 50, required: true},
    phone_number: {type: String, required: true},
    country: {type: Schema.ObjectId, ref: 'Country', required: true},
    avatar: {type: String, default: DEFAULT_AVATAR},
    front_identity_card_img: {type: String},
    back_identity_card_img: {type: String},
    birthday: {type: Date, required: true},
    online_status: {type: Boolean, default: false},
    roles: {type: String, default: Role.USER},
    otp_code: {type: Number, maxLength: 6},
    account_status: {type: String, default: AccountStatus.VERIFY}
}, {timestamps: true})

module.exports = UserSchema
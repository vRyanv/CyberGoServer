const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
    email: {type: String, required: true},
    password: {type: String, minLength: 8},
    gender: {type: Number, required: true}, //1 = male | 2 = female | 3 = other
    full_name: {type: String, maxLength: 50, required: true},
    phone_number: {type: String, required: true},
    country_id: {type: Schema.ObjectId, ref: 'Country', required: true},
    avatar: {type: String, default: "avatar_default.png"},
    front_identity_card_img: {type: String},
    back_identity_card_img: {type: String},
    birthday: {type: Date},
    online_status: {type: Boolean, default: false},
    roles: {type: [String], require: true, default: 'user'},
    opt_code: {type: String, maxLength: 6},
    account_status: {type: String, default: 'verify'},
    token: {type: String}
}, {timestamps: true})

module.exports = UserSchema
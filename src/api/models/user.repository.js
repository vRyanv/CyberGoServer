const userSchema = require("./schema/user.schema");
const mongoose = require("mongoose");
const User = mongoose.model("User", userSchema);

module.exports = {
    findById(user_id) {
        return User.findOne({_id: user_id}).lean();
    },
    findByEmailAndPassword(email, password) {
        return User.findOne({email, password}).lean();
    },
    searchByEmail(email) {
        return User.findOne({email}).lean()
    },
    searchByPhoneNumber(phone_number) {
        return User.findOne({phone_number}).lean();
    },
    create(user_shema) {
        return User.create(user_shema);
    },
    updateActiveAccount({email, otp_code}, data_update) {
        return User.findOneAndUpdate({email, otp_code}, data_update).lean()
    }
}

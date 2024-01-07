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
    findByEmail(email) {
        return User.findOne({email}).lean()
    },
    findByPhoneNumber(phone_number) {
        return User.findOne({phone_number}).lean();
    },
    create(user_shema) {
        return User.create(user_shema);
    },
    updateActiveAccount(update_conditions, update_data) {
        return User.findOneAndUpdate(update_conditions, update_data).lean()
    }
}

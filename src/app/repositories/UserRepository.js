const {UserSchema} = require("../schemas");
const mongoose = require("mongoose");
const User = mongoose.model("User", UserSchema);

module.exports = {
    UpdateUserInformation(user_id, user){
        return User.findOneAndUpdate({_id:user_id}, user)
    },
    FindEmailExisted(user_id, email){
        return User.findOne({ email, _id: {$ne: user_id}})
    },
    FindById(user_id) {
        return User.findOne({_id: user_id}).populate('country').lean();
    },
    FindByEmailAndPassword(email, password) {
        return User.findOne({email, password}).lean();
    },
    FindByEmail(email) {
        return User.findOne({email}).lean()
    },
    FindByPhoneNumber(phone_number) {
        return User.findOne({phone_number}).lean();
    },
    Create(user) {
        return User.create(user);
    },
    UpdateActiveAccount(update_conditions, update_data) {
        return User.findOneAndUpdate(update_conditions, update_data).lean()
    }
}

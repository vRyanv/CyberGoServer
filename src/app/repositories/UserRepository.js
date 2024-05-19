const {User} = require("../schemas");
const {Role} = require("../constant");

const UserRepository = {
    CountAllUser(){
        return User.countDocuments({role:Role.USER})
    },
    FindUserDetail(user_id){
        return User.findById(user_id)
            .populate('country')
            .select('-password -firebase_token').lean()
    },
    GetAllUser(status){
        return User.find(status == 'ALL' ? {role:Role.USER}:{account_status: status, role:Role.USER})
            .populate('country')
            .select('-password -firebase_token').lean()
    },
    GetFirsebaseTokenByUserId(user_id){
        return User.findOne({_id:user_id})
        .select('firebase_token').lean()
    },
    UpdateOnlineStatus(user_id, online_status) {
        return User.updateOne({_id: user_id}, {online_status})
    },
    UpdateFirebaseToken(user_id, firebase_token) {
        return User.updateOne({_id: user_id}, {firebase_token})
    },
    UpdateUserInformation(user_id, user) {
        return User.findOneAndUpdate({_id: user_id}, user)
    },
    FindEmailExisted(user_id, email) {
        return User.findOne({email, _id: {$ne: user_id}})
    },
    FindById(user_id) {
        return User.findOne({_id: user_id}).populate('country').lean();
    },
    FindByEmailAndPassword(email, password) {
        return User.findOne({email, password}).populate('country').lean();
    },
    FindByEmail(email) {
        return User.findOne({email}).populate('country').lean()
    },
    FindByPhoneNumber(phone_number) {
        return User.findOne({phone_number}).lean();
    },
    Create(user) {
        return User.create(user);
    },
    UpdateActiveAccount(update_conditions, update_data) {
        return User.findOneAndUpdate(update_conditions, update_data).populate('country').lean()
    }
}

module.exports = UserRepository

const userSchema = require("./schema/user.schema");
const mongoose = require("mongoose");
const User = mongoose.model("User", userSchema);

class UserRepository {
    async findById(user_id) {
        try {
            const data = await User.find({_id: user_id});
            return data;
        } catch (error) {
            throw error;
        }
    }

    async findUserByEmailAndPassword(email, password) {
        return await User.findOne({email, password}).exec();
    }

    async searchUserByEmail(email) {
        return await User.findOne({email}).exec();
    }

    async searchUserByPhoneNumber(phone_number) {
        return await User.findOne({phone_number}).exec();
    }

    async createUser(user_shema) {
        return User.create(user_shema);
    }

    async updateUser(user_shema) {
        try {
            const result = User.findByIdAndUpdate(user_shema);
            return {
                success: true,
                data: result,
            };
        } catch (error) {
            return {
                success: false,
                error: error.message,
            };
        }
    }
}

module.exports = new UserRepository();

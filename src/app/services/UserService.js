const {StatusCode, AccountStatus, ErrorType} = require("../constant");

const {UserRepository, CountryRepository} = require("../repositories");
const {JWT, OPT, SecurityUtil} = require("../utils");

const UserService = {
    async SignIn(email, password) {
        let user = await UserRepository.FindByEmail(email)
        if (user != null && user.account_status === AccountStatus.VERIFY) {
            return StatusCode.VERIFY
        }
        user = await UserRepository.FindByEmailAndPassword(email, password)

        if (!user) {
            return StatusCode.NOT_FOUND
        }

        const token_object = {
            user_id: user._id,
            role: user.role
        }
        return {token:JWT.Create(token_object)}
    },
    async SignUp(user){
        const email_used = await UserRepository.FindByEmail(user.email)
        if (email_used != null && email_used.account_status === AccountStatus.VERIFY && email_used.otp_code !== 0) {
            return StatusCode.VERIFY
        }

        let phone_number_existed = await UserRepository.FindByPhoneNumber(user.phone_number)
        if(phone_number_existed){
            return ErrorType.PHONE_EXISTED
        }

        if(user.password !== user.confirm_password){
            return ErrorType.PASS_NOT_MATCH_CONFIRM_PASS
        }

        let country = await CountryRepository.FindCountryByPrefix(user.number_prefix)

        user.country = country._id
        user.password = await SecurityUtil.Hash(user.password)
        try{
            const new_user = await UserRepository.Create(user)
            return {new_user}
        } catch (error){
            return null
        }
    }
}

module.exports = UserService
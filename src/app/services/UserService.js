const {
    StatusCode, 
    AccountStatus, 
    ErrorType, 
    DEFAULT_AVATAR,
    StoragePath
} = require("../constant");

const {UserRepository, CountryRepository} = require("../repositories");
const {JWT, SecurityUtil, FileUtil} = require("../utils");

const UserService = {
    async UpdateIdCard(user_id, files){
        const user = {
            front_id_card: files.front_id_card && files.front_id_card[0].filename,
            back_id_card: files.back_id_card && files.back_id_card[0].filename
        }
        try{
            const user_found = await UserRepository.UpdateUserInformation(user_id, user)
            if(files.front_id_card){
                FileUtil.DeleteFile(StoragePath.ID_CARD_PATH, user_found.front_id_card)
            }

            if(files.back_id_card){
                FileUtil.DeleteFile(StoragePath.ID_CARD_PATH, user_found.back_id_card)
            }
            return true
        } catch(err){
            console.log(err)
            return false
        }

    },
    async UpdateProfile(user_id, avatar, full_name, gender, id_number, address){
        const user = {
            full_name,
            gender,
            id_number,
            address
        }
        if(avatar){
            user.avatar = avatar.filename
        }

        try{
            const user_found = await UserRepository.UpdateUserInformation(user_id, user)
            if(avatar && user_found.avatar !== DEFAULT_AVATAR){
                FileUtil.DeleteFile(StoragePath.AVATAR_PATH, user_found.avatar);
            }
            if(avatar){
                return {avatar:user.avatar}
            }
            return true
        } catch(error) {
            console.log(error)
            return false
        }
    },
    Profile(user_id){
        return UserRepository.FindById(user_id)
    },
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
            id: user._id,
            role: user.role
        }
        return {
            token: JWT.Create(token_object),
            user_id: user._id.toString(),
            avatar: user.avatar, 
            full_name: user.full_name
        }
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
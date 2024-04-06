const {
    StatusCode, 
    AccountStatus, 
    ErrorType, 
    DEFAULT_AVATAR,
    StoragePath
} = require("../constant");

const {
    UserRepository,
    CountryRepository,
    DriverRegistrationRepository
} = require("../repositories");

const {JWT, SecurityUtil, FileUtil} = require("../utils");

const UserService = {
    async UpdateFirebaseToken(user_id, firebase_token){
        try {
            return await UserRepository.UpdateFirebaseToken(user_id, firebase_token)
        } catch (error){
            console.error(error)
            return false
        }
    },
    async DriverRegistration(user, vehicle_name, vehicle_type, license_plates, files){
        const vehicle_registration_certificate = {
            front_vehicle_registration_certificate: files.front_vehicle_registration_certificate[0].filename,
            back_vehicle_registration_certificate: files.front_vehicle_registration_certificate[0].filename
        }
        const driving_licenses = {
            front_driving_license: files.front_driving_license[0].filename,
            back_driving_license: files.back_driving_license[0].filename
        }
        const vehicle_img = {
            front_vehicle: files.front_vehicle[0].filename,
            back_vehicle: files.back_vehicle[0].filename,
            right_vehicle: files.right_vehicle[0].filename,
            left_vehicle: files.left_vehicle[0].filename
        }

        const vehicle = {
            driver: user.id,
            vehicle_name,
            vehicle_type,
            license_plates,
            registration_date: new Date(),
            ...vehicle_registration_certificate,
            ...driving_licenses,
            ...vehicle_img,
        }

        try {
            await DriverRegistrationRepository.CreateDriverRegistration(vehicle);
            return true
        } catch (error){
            console.error(error)
            return false
        }
    },
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
        const phone_number = user.country.prefix + user.phone_number
        return {
            token: JWT.Create(token_object),
            user_id: user._id.toString(),
            avatar: user.avatar, 
            full_name: user.full_name,
            phone_number
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
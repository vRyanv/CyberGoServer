const {UserRepository, CountryRepository} = require('../repositories')
const {AccountStatus, StatusCode, ErrorType} = require("../constant");
const {SecurityUtil, JWT, Authenticator, Mailer} = require("../utils");

const SecurityService = {
    async ResetPassword(body){
        const {otp_code, email, new_pass} = body
        const user = await UserRepository.FindByEmail(email)
        if(!user){
            return StatusCode.NOT_FOUND
        }

        if(user.account_status === AccountStatus.BANNED){
            return StatusCode.ACCOUNT_BANNED
        } else if(user.account_status === AccountStatus.VERIFY){
            return StatusCode.VERIFY
        }

        if(otp_code.length < 5 || otp_code != user.otp_code){
            return StatusCode.BAD_REQUEST
        }

        const password = await SecurityUtil.Hash(new_pass)
        await UserRepository.UpdateUserInformation(user._id.toString(), {password, otp_code: 0})
        return StatusCode.UPDATED
    },
    async ForgotPassword(email){
        const user = await UserRepository.FindByEmail(email)
        if(!user){
            return StatusCode.NOT_FOUND
        }

        if(user.account_status === AccountStatus.BANNED){
            return StatusCode.ACCOUNT_BANNED
        } else if(user.account_status === AccountStatus.VERIFY){
            return StatusCode.VERIFY
        }

        const otp_code = SecurityUtil.GenerateOTP()
        await UserRepository.UpdateUserInformation(user._id.toString(), {otp_code})

        const from_mail = 'Cyber Go System'
        const to_mai = user.email
        const subject = 'Recovery password'
        const content = 'Your OTP code: ' +otp_code
        Mailer(from_mail, to_mai, subject, content)
        return StatusCode.UPDATED
    },
    async GetQRCode(user_id){
        const user = await UserRepository.FindById(user_id)
        const {email, secret, is_2fa_enable} = user;
        const service_name = "CyberGo"
        const OTP = Authenticator.GenerateOTPToken(email, service_name, secret)
        const qr_code =  await Authenticator.GenerateQRCodeImg(OTP)
        return {
            qr_code,
            email,
            is_2fa_enable
        }
    },
    async Verify2FA(email, otp_token){
        const user = await UserRepository.FindByEmail(email)

        if(!user){
            return StatusCode.NOT_FOUND
        }

        const is_valid = Authenticator.VerifyOTPToken(otp_token, user.secret)
        if(!is_valid){
            return StatusCode.UNAUTHORIZED
        }

         const token_object = {
             id: user._id,
             role: user.role
         }
        return {
            token: JWT.Create(token_object),
            user_id: user._id.toString(),
            avatar: user.avatar,
            role: user.role,
            full_name: user.full_name,
        };
    },
    async Update2FAStatus(user_id, status){
        try{
            return await UserRepository.UpdateUserInformation(user_id, {is_2fa_enable: status})
        } catch(error){
            console.log(error)
            return false
        }

    },
    async SignIn(email, password) {
        let user = await UserRepository.FindByEmail(email);
        if (user != null && user.account_status === AccountStatus.VERIFY) {
            return StatusCode.VERIFY;
        }

        if (!user) {
            return StatusCode.NOT_FOUND;
        }

        if(user.account_status === AccountStatus.BANNED){
            return StatusCode.ACCOUNT_BANNED
        }

        const is_valid_pass = await SecurityUtil.Compare(password, user.password);
        if (!is_valid_pass) {
            return StatusCode.NOT_FOUND;
        }

        if(user.is_2fa_enable){
            return StatusCode.TWO_FACTOR_AUTHENTICATION
        }

        const token_object = {
            id: user._id,
            role: user.role,
        };
        const phone_number = user.country.prefix + user.phone_number;
        return {
            token: JWT.Create(token_object),
            user_id: user._id.toString(),
            avatar: user.avatar,
            role: user.role,
            full_name: user.full_name,
            phone_number,
        };
    },
    async SignUp(user) {
        const email_used = await UserRepository.FindByEmail(user.email);
        if (
            email_used != null &&
            email_used.account_status === AccountStatus.VERIFY &&
            email_used.otp_code !== 0
        ) {
            return StatusCode.VERIFY;
        }

        let phone_number_existed = await UserRepository.FindByPhoneNumber(
            user.phone_number
        );
        if (phone_number_existed) {
            return ErrorType.PHONE_EXISTED;
        }

        let country = await CountryRepository.FindCountryByPrefix(
            user.number_prefix
        );

        user.country = country._id;
        user.password = await SecurityUtil.Hash(user.password);
        user.secret = Authenticator.GenerateUniqueSecret()

        try {
            const new_user = await UserRepository.Create(user);
            return {new_user};
        } catch (error) {
            console.log(error);
            return null;
        }
    },
}

module.exports = SecurityService
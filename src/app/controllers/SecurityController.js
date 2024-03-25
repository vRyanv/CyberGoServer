const validator = require('validator')

const {StatusCode, AccountStatus, ErrorType} = require('../constant')
const {UserService, MailService} = require('../services')

const SecurityController = {
    async UpdateFirebaseToken(req, res){
        const user_id = req.user.id
        const {firebase_token} = req.body
        const result_update = await UserService.UpdateFirebaseToken(user_id, firebase_token)
        if(result_update){
            return res.status(200).json({code: StatusCode.UPDATED, message: 'updated firebase token successfully'})
        }
        return res.status(200).json({code: StatusCode.BAD_REQUEST, message: 'updating firebase token failed'})
    },
    async SignInAction(req, res) {
        let {email, password} = req.body
        const sign_in_result = await UserService.SignIn(email, password)

        if(sign_in_result === StatusCode.VERIFY){
            return res.status(200).json({
                code: StatusCode.VERIFY,
                message: 'Account is being verified, check in your mail'
            })
        } else if(sign_in_result === StatusCode.NOT_FOUND){
            return res.status(200).json({
                code: StatusCode.NOT_FOUND,
                message: 'Login is failed'
            })
        }

        return res.status(200).json({
            code: StatusCode.OK,
            message: 'Login is successfully',
            ...sign_in_result
        })
    },
    async SignUpAction(req, res) {
        const user = {
            ...req.body
        }

        const sign_up_result = await UserService.SignUp(user)
        if(sign_up_result === AccountStatus.VERIFY){
            return res.status(200).json({
                code: StatusCode.VERIFY,
                message: 'Account is being verified, check in your mail'
            })
        } else if(sign_up_result === ErrorType.PHONE_EXISTED){
            return res.status(200).json({
                code: StatusCode.BAD_REQUEST,
                errors: 'Phone number already used by another user'
            })
        } else if(sign_up_result === ErrorType.PASS_NOT_MATCH_CONFIRM_PASS){
            return res.status(200).json({
                code: StatusCode.BAD_REQUEST,
                errors: 'Password and confirm password does not match'
            })
        } else if(!sign_up_result){
            return res.status(200).json({
                code: StatusCode.BAD_REQUEST,
                errors: 'Create account is failed'
            })
        }

        const  {new_user} = sign_up_result
        if(new_user){
            res.status(200).json({code: StatusCode.CREATED, is_sign_up_success: true, message: 'Sign up is successfully'})
            try {
                await MailService.Send(new_user.email, new_user.full_name, new_user.opt_code)
            } catch (error){
                console.log(error)
            }
        } else {
            res.status(200).json({code: StatusCode.BAD_REQUEST, errors: 'Sign up is failed'})
        }
    },
    async ActiveAccountAction(req, res) {
        const {email, otp_code} = req.body.email
        //
        // if (otp_code === undefined) {
        //     errors.push('OTP code is required')
        // } else if (otp_code.length < 5) {
        //     errors.push('OTP code must have 5 numbers')
        // }
        //
        // if (errors.length > 0) {
        //     return res.status(200).json({code: status_code.BAD_REQUEST, is_active_success: false, errors})
        // }
        //
        // let update_data = {
        //     account_status: 'activated',
        //     otp_code: 0
        // }
        //
        // let update_conditions = {
        //     email,
        //     otp_code
        // }
        //
        // let user = await user_repo.updateActiveAccount(update_conditions, update_data)
        // if (user == null) {
        //     return res.status(200).json({
        //         code: status_code.NOT_FOUND,
        //         message: 'Not found account of your email and OTP code'
        //     })
        // }
        // let user_token = jwt.getUserToken(user._id.toString(), user.roles)
        // return res.status(200).json({code: status_code.UPDATED, user_token, message: 'Account has been activated'})
    },
    async createPassword(req, res) {

    },
    async CheckPhoneExistedAction(req, res) {
        // let prefix = req.params.prefix
        // let phone_number = req.params.phone_number
        // if (prefix == null) {
        //     return res.send({status: 400, message: 'prefix is required'})
        // } else if (phone_number == null) {
        //     return res.send({status: 400, message: 'Phone number is required'})
        // } else if (!validator.isMobilePhone(_getFullPhoneNumber(prefix, phone_number), 'any', {strictMode: true})) {
        //     return res.send({status: 400, message: 'Invalid phone number'})
        // } else {
        //     let user = await user_repo.findByPhoneNumber(phone_number)
        //     if (user != null) {
        //         return res.send({status: 200, is_phone_existed: true, message: 'Phone number is existed'})
        //     } else {
        //         return res.send({status: 200, is_phone_existed: false, message: 'Phone number has not been used yet'})
        //     }
        // }
    },
    async CheckMailExistedAction(req, res) {
        // let email = req.params.email
        // if (email == null) {
        //     return res.send({status: 400, message: 'Email is required'})
        // } else if (!validator.isEmail(email)) {
        //     return res.send({status: 400, message: 'Invalid email'})
        // } else {
        //     let user = await user_repo.searchByEmail(email)
        //     if (user != null) {
        //         return res.send({status: 200, is_email_existed: true, message: 'Email is existed'})
        //     } else {
        //         return res.send({status: 200, is_email_existed: false, message: 'Email has not been used yet'})
        //     }
        // }
    }
}

module.exports = SecurityController


const {StatusCode, AccountStatus, ErrorType} = require("../constant");
const {UserService, SecurityService} = require("../services");
const {UserRepository} = require("../repositories");

const SecurityController = {
    ResetPasswordAction(req, res) {
        SecurityService.ResetPassword(req.body)
            .then(result => {
                console.log(result)
                return res.status(StatusCode.OK).json({code: result})
            })
    },
    ForgotPasswordAction(req, res){
        const {email} = req.body;
        SecurityService.ForgotPassword(email)
            .then(result => {
                console.log(result)
                return res.status(StatusCode.OK).json({code: result})
            })
    },
    GetQRCodeAction(req, res) {
        SecurityService.GetQRCode(req.user.id)
            .then(result => {
                const {qr_code, is_2fa_enable, email} = result
                return res.status(StatusCode.OK).json({code: StatusCode.OK, qr_code, is_2fa_enable, email})
            })
    },
    Verify2FAAction(req, res){
        const {email, otp_code} = req.body
        SecurityService.Verify2FA(email, otp_code)
            .then(result => {

                if(result.token){
                    return res.status(StatusCode.OK).json({code: StatusCode.OK, ...result})
                }
                return res.status(StatusCode.OK).json({code: result})
            })
    },
    Update2FAStatusStatus(req, res) {
        const {status} = req.body
        SecurityService.Update2FAStatus(req.user.id, status)
            .then(result =>{
                if(result){
                    return res.status(StatusCode.OK).json({code: StatusCode.UPDATED, status})
                }
                return res.status(StatusCode.OK).json({code: StatusCode.BAD_REQUEST})
            })
    },
    UpdatePasswordAction(req, res) {
        UserService.UpdatePassword(req.user.id, req.body).then((result) => {
            if (result) {
                return res.status(200).json({code: StatusCode.UPDATED});
            }
            return res.status(200).json({code: StatusCode.BAD_REQUEST});
        });
    },
    async UpdateFirebaseToken(req, res) {
        console.log(req.body);
        const user_id = req.user.id;
        const {firebase_token} = req.body;
        const result_update = await UserService.UpdateFirebaseToken(
            user_id,
            firebase_token
        );
        if (result_update) {
            return res.status(200).json({
                code: StatusCode.UPDATED,
                message: "updated firebase token successfully",
            });
        }
        return res.status(200).json({
            code: StatusCode.BAD_REQUEST,
            message: "updating firebase token failed",
        });
    },
    async SignInAction(req, res) {
        let {email, password} = req.body;
        const sign_in_result = await SecurityService.SignIn(email, password);

        if (sign_in_result === StatusCode.VERIFY) {
            const user = await UserRepository.FindByEmail(email);
            return res.status(200).json({
                code: StatusCode.VERIFY,
                number_prefix: user.country.prefix,
                phone_number: user.phone_number,
                message: "Account is being verified, check in your mail",
            });
        }
        else if (sign_in_result === StatusCode.NOT_FOUND) {
            return res.status(200).json({
                code: StatusCode.NOT_FOUND,
                message: "Login is failed",
            });
        } else if(sign_in_result === StatusCode.TWO_FACTOR_AUTHENTICATION) {
            return res.status(200).json({
                code: StatusCode.TWO_FACTOR_AUTHENTICATION,
                email
            });
        }else if(sign_in_result === StatusCode.ACCOUNT_BANNED){
            return res.status(200).json({
                code: StatusCode.ACCOUNT_BANNED
            });
        }

        return res.status(200).json({
            code: StatusCode.OK,
            message: "Login is successfully",
            ...sign_in_result,
        });
    },
    async SignUpAction(req, res) {
        const user = {
            ...req.body,
        }

        const sign_up_result = await SecurityService.SignUp(user);

        if (sign_up_result === StatusCode.VERIFY) {
            return res.status(200).json({
                code: StatusCode.VERIFY,
                message: "Account is being verified",
            });
        } else if (sign_up_result === ErrorType.PHONE_EXISTED) {
            return res.status(200).json({
                code: StatusCode.BAD_REQUEST,
                errors: "Phone number already used by another user",
            });
        } else if (sign_up_result === ErrorType.PASS_NOT_MATCH_CONFIRM_PASS) {
            return res.status(200).json({
                code: StatusCode.BAD_REQUEST,
                errors: "Password and confirm password does not match",
            });
        } else if (!sign_up_result) {
            return res.status(200).json({
                code: StatusCode.BAD_REQUEST,
                errors: "Create account is failed",
            });
        }

        const {new_user} = sign_up_result;
        if (new_user) {
            res.status(200).json({
                code: StatusCode.CREATED,
                is_sign_up_success: true,
                message: "Sign up is successfully",
            });
            try {
                const phone_number_national = req.body.number_prefix + req.body.phone_number;

                // Twilio.SendOTP(phone_number_national).then((result) => {
                //     console.log(result);
                // });
            } catch (error) {
                console.log(error);
            }
        } else {
            return res
                .status(200)
                .json({code: StatusCode.BAD_REQUEST, errors: "Sign up is failed"});
        }
    },
    async ActiveAccountAction(req, res) {
        const {number_prefix, phone_number, otp_code} = req.body;
        console.log(req.body);
        const phone_number_national = number_prefix + phone_number;
        try {
            // const result = await Twilio.VerifyOTP(phone_number_national, otp_code);
            const result = {valid: true};
            console.log(result);
            if (!result.valid) {
                return res.status(200).json({
                    code: StatusCode.BAD_REQUEST,
                    message: "Wrong OTP code",
                });
            }

            const user = await UserRepository.UpdateActiveAccount(
                {phone_number},
                {account_status: AccountStatus.ACTIVATED}
            );
            return res.status(200).json({
                code: StatusCode.UPDATED,
            });
        } catch (error) {
            console.log(error);
            return res.status(200).json({
                code: StatusCode.BAD_REQUEST,
            });
        }
    },
};

module.exports = SecurityController;

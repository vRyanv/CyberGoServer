const user_repo = require('../models/user.repository')
const country_repo = require('../models/country.repository')
const validator = require('validator')
const mail_service = require('../services/mail.service')

module.exports = {
    async signUpAction(req, res) {
        let errors = []
        let is_valid_email = false
        let email_used;
        if (req.body.full_name == null) {
            errors.push('Full name is required')
        }
        if (req.body.full_name.trim().length < 2) {
            errors.push('Full name must be at least 2 characters')
        }
        if (req.body.email == null) {
            errors.push('Email is required')
        } else {
            is_valid_email = validator.isEmail(req.body.email)
            if (!is_valid_email) {
                errors.push('Invalid email address')
            } else {
                email_used = await user_repo.searchUserByEmail(req.body.email)
                if (email_used != null) {
                    errors.push('Email address already used by another user')
                }
            }
        }

        if (req.body.phone_number == null) {
            errors.push('Phone number is required')
        } else {
            if (req.body.number_prefix == null) {
                errors.push('Number prefix is required')
            } else {
                let full_phone_number = _getFullPhoneNumber(
                    req.body.number_prefix,
                    req.body.phone_number
                );
                if (!validator.isMobilePhone(full_phone_number, 'any', {strictMode: true})) {
                    errors.push('Invalid phone number')
                } else {
                    let phone_number_existed = await user_repo.searchUserByPhoneNumber(req.body.phone_number)
                    if (phone_number_existed != null) {
                        errors.push('Phone number address already used by another user')
                    }
                }
            }
        }

        if (req.body.gender == null) {
            errors.push('Gender is required')
        } else if (req.body.gender != 1 && req.body.gender != 2 && req.body.gender != 3) {
            errors.push('Invalid gender - must be 1 or 2 or 3')
        }

        if (errors.length > 0) {
            return res.status(200).json({code: 400, errors})
        }

        if (email_used != null && email_used.account_status === 'verify' && email_used.opt_code != null) {
            return res.status(200).json({code: 200, verifying_account: true, message: 'Account is being verified, check in your mail'})
        }

        let OPT_code = _getOTPCode();
        let country = await country_repo.getCountryByPrefix(req.body.number_prefix)

        let user_schema = {
            email: req.body.email,
            phone_number: req.body.phone_number,
            gender: req.body.gender,
            full_name: req.body.full_name,
            opt_code: OPT_code,
            country_id: country._id
        }

        // let create_user_result = await user_repo.createUser(user_schema)

        await _sendMailConfirmRegisterAccount(
            req.body.email,
            req.body.full_name,
            OPT_code
        )
        res.status(200).json({code: 201, is_sign_success: true , message: 'sign up success'})

    },
    async activeAccountAction(req, res) {
        res.send({status: 200, data: req, message: 'active success success'})
    },
    async checkPhoneExistedAction(req, res) {
        let prefix = req.params.prefix
        let phone_number = req.params.phone_number
        if (prefix == null) {
            res.send({status: 400, message: 'prefix is required'})
        } else if (phone_number == null) {
            res.send({status: 400, message: 'Phone number is required'})
        } else if (!validator.isMobilePhone(_getFullPhoneNumber(prefix, phone_number), 'any', {strictMode: true})) {
            res.send({status: 400, message: 'Invalid phone number'})
        } else {
            let user = await user_repo.searchUserByPhoneNumber(phone_number)
            if (user != null) {
                res.send({status: 200, is_phone_existed: true, message: 'Phone number is existed'})
            } else {
                res.send({status: 200, is_phone_existed: false, message: 'Phone number has not been used yet'})
            }
        }
    },
    async checkMailExistedAction(req, res) {
        let email = req.params.email
        if (email == null) {
            res.send({status: 400, message: 'Email is required'})
        } else if (!validator.isEmail(email)) {
            res.send({status: 400, message: 'Invalid email'})
        } else {
            let user = await user_repo.searchUserByEmail(email)
            if (user != null) {
                res.send({status: 200, is_email_existed: true, message: 'Email is existed'})
            } else {
                res.send({status: 200, is_email_existed: false, message: 'Email has not been used yet'})
            }
        }
    }
}

const _sendMailConfirmRegisterAccount = async (to_email, full_name, OPT_code) => {
    let subject = 'Cyber Go OTP Code'
    let content = _createMailContent(full_name, OPT_code)
    await mail_service(
        process.env.EMAIL,
        to_email,
        subject,
        content,
    )
}

const _getOTPCode = () => {
    let OPT_code = '';
    for (let i = 0; i < 6; i++) {
        OPT_code += Math.floor(Math.random() * 10);
    }
    return OPT_code
}

const _getFullPhoneNumber = (prefix, phone_number) => {
    return prefix + phone_number
}

const _createMailContent= (full_name, OPT_code)=>{
    return `<!DOCTYPE html>
    <html lang="en">
        <head>
        <meta charset="UTF-8">
        <title>OTP Confirmation</title>
    <style>
        /* Reset CSS */
        body, html {
        margin: 0;
        padding: 0;
        font-family: Arial, sans-serif;
        background-color: #f4f4f4;
    }

        /* Container styles */
        .container {
        max-width: 600px;
        margin: 20px auto;
        padding: 20px;
        border-radius: 10px;
        background-color: #fff;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }

        /* Heading styles */
        h1 {
        text-align: center;
        color: #333;
    }

        /* Content styles */
        .content {
        padding: 20px;
        text-align: center;
    }

        /* Button styles */
        .btn {
        display: inline-block;
        padding: 10px 20px;
        color: #fff;
        background-color: #009688;
        text-decoration: none;
        border-radius: 5px;
    }
    </style>
</head>
    <body>
    <div class="container">
        <h1>Email OTP Confirmation</h1>
        <div class="content">
            <p>Hello,</p>
            <p>Thank you for registering an account with us!</p>
            <p>Your OTP code is: <strong>${OPT_code}</strong></p>
        </div>
    </div>
    </body>
</html>`
}
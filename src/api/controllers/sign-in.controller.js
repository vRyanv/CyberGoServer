const status_code = require('../constant/status-code');
const user_model = require('../models/user.repository');
const {getUserToken} = require('../utils/jwt.util')
const validator = require('validator')
module.exports =  {
    async signInAction(req, res) {
        let email = req.body.email
        let password = req.body.password
        let errors = []
        if(email === undefined || email.length === 0){
            errors.push('Email is required')
        } else if(!validator.isEmail(email)){
            errors.push('Invalid email')
        }

        if(password === undefined || password.length === 0){
            errors.push('Password is required')
        }
        if(errors.length > 0){
            return res.status(200).json({code: status_code.BAD_REQUEST, errors})
        }
        
        let user_verify =  await user_model.findByEmail(email)
        if(user_verify != null && user_verify.account_status === 'verify'){
            return res.status(200).json({code: status_code.VERIFY, message:'Account is being verified, check in your mail'})
        }


        let user = await user_model.findByEmailAndPassword(email, password)
        if(user == null) {
            return res.status(200).json({code: status_code.NOT_FOUND, message: 'Not found any user'})
        } else{
            let token = getUserToken(user._id, user.roles)
            return res.status(200).json({code: status_code.OK, message: 'login success', token})
        }
    }
}

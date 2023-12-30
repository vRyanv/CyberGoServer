const user_model = require('../models/user.repository');
const {getUserToken} = require('../utils/jwt.util')
class SignInController {
    async signInHandle(req, res) {
        let email = req.body.email
        let password = req.body.password
        let user = await user_model.findUserByEmailAndPassword(email, password)
        console.log(user)
        if (user != null) {
            delete user.password
            res.send({
                status: 200,
                data: user,
                token: getUserToken(user._id, user.roles),
                message: 'login success'
            })
        } else {
            res.send({status: 404, message: 'Not found any user', form_data: {email, password}})
        }
    }
}

module.exports = new SignInController
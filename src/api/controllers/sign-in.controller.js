const user_model = require('../models/user.repository');
const {getUserToken} = require('../utils/jwt.util')
module.exports =  {
    async signInAction(req, res) {
        let email = req.body.email
        let password = req.body.password
        let user = await user_model.findByEmailAndPassword(email, password)
        if(user == null) {
            res.status(200).json({code: 404, message: 'Not found any user'})
        } else{
            let token = getUserToken(user._id, user.roles)
            res.status(200).json({code: 200, message: 'login success', token})
        }
    }
}

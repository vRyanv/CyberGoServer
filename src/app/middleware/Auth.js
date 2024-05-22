const {JWT} = require('../utils')
const {StatusCode} = require('../constant')
const Auth = (req, res, next, roles)=>{
    const user_token = req.headers['authorization'];
    const user = JWT.Verify(user_token)
    if(user && roles.includes(user.role)){
      req.user = user
      return next()
    }
    return res.status(200).json({code: StatusCode.UNAUTHORIZED, errors: 'UNAUTHORIZED'})
}

module.exports = Auth

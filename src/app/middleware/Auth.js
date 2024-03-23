const {JWT} = require('../utils')
const {ContentType, StatusCode} = require('../constant')
const Auth = (req, res, next, roles)=>{
    const user_token = req.headers['authorization'];
    const user = JWT.Verify(user_token)
    if(user && roles.includes(user.role)){
      req.user = user
      return next()
    }
    if(req.get('Accept') === ContentType.APP_JSON){
      return res.status(200).json({code: StatusCode.UNAUTHORIZED, errors: 'UNAUTHORIZED'})
    }
    console.log('return html')
    return res.render('security/unauthorized', {layout: false})
}

module.exports = Auth

const jwt = require('jsonwebtoken');
const {JwtKey} = require('../../env')
const JWT = {
    Create(object){
        return jwt.sign(object, JwtKey.PRIVATE_KEY)
    },
    CreateWithExpire(object, expiresIn){
        return jwt.sign(object, JwtKey.PRIVATE_KEY, {expiresIn})
    },
    Verify(token){
        try{
            return jwt.verify(token, JwtKey.PRIVATE_KEY)
        } catch (error){
            return false
        }
    }
}

module.exports = JWT
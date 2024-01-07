const jwt = require("jsonwebtoken");
require("dotenv").config({ path: "../.env" });
function getUserToken(user_id, roles){
    return jwt.sign({user_id, roles}, process.env.JWT_PRIVATE_KEY)
}

function getVerifyUserToken(user_id, expire_time){
    return jwt.sign({user_id, roles}, process.env.JWT_PRIVATE_KEY, {expiresIn: expire})
}

module.exports = {getUserToken, getVerifyUserToken}
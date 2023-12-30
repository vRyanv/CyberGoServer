const jwt = require("jsonwebtoken");
require("dotenv").config({ path: "../.env" });
function getUserToken(user_id, roles){
    return jwt.sign({user_id, roles}, process.env.JWT_PRIVATE_KEY)
}

module.exports = {getUserToken}
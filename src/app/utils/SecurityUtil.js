const bcrypt = require("bcrypt");
const salt = 10;

const SecurityUtil = {
    Hash(string){
        return bcrypt.hash(string, salt)
    },
    Compare(string, hash){
        return bcrypt.compare(string, hash)
    }
}

module.exports = SecurityUtil
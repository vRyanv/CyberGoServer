const bcrypt = require("bcrypt");
const salt = 10;

const SecurityUtil = {
    Hash(string) {
        return bcrypt.hash(string, salt)
    },
    Compare(string, hash) {
        return bcrypt.compare(string, hash)
    },
    GenerateOTP() {
        const digits = '0123456789';
        let otp = '';
        for (let i = 0; i < 5; i++) {
            otp += digits[Math.floor(Math.random() * 10)];
        }
        return otp;
    }
}

module.exports = SecurityUtil
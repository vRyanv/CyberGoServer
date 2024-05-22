const qrcode = require('qrcode')
const {authenticator} = require('otplib')

const Authenticator = {
    GenerateUniqueSecret(){
        return authenticator.generateSecret()
    },
    GenerateOTPToken(email, service_name, secret){
        return authenticator.keyuri(email, service_name, secret)
    },
    VerifyOTPToken(token, secret){
        return authenticator.verify({token, secret})
    },
    async GenerateQRCodeImg(otp){
        try{
            return await qrcode.toDataURL(otp);
        } catch (error){
            console.log('GenerateQRCode::', error)
            return false
        }
    }
}

module.exports = Authenticator;
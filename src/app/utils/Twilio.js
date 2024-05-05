const TwilioKey = require('../../env/twilio-key.json')
const ACCOUNT_SID = TwilioKey.ACCOUNT_SID;
const AUTH_TOKEN = TwilioKey.AUTH_TOKEN
const VERIFY_SID = TwilioKey.VERIFY_SID
const client = require("twilio")(ACCOUNT_SID, AUTH_TOKEN);

const Twilio = {
    async SendOTP(national_phone){
        try{
            return await client.verify.v2
                .services(VERIFY_SID)
                .verifications.create({ to: national_phone, channel: "sms" })
        } catch (error){
            console.log(error)
            return false
        }
    },
    async VerifyOTP(national_phone, otp){
        try {
            return client.verify.v2
                .services(VERIFY_SID)
                .verificationChecks.create({ to: national_phone, code: otp })
        } catch (error){
            console.log(error)
            return false
        }
    }
}

module.exports = Twilio;
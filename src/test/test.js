
// Download the helper library from https://www.twilio.com/docs/node/install
// Set environment variables for your credentials
// Read more at http://twil.io/secure
const accountSid = "ACc3434680f2645a9b6f528e047e307a7f";
const authToken = "cf743520ec44cf40ef54acdc77310266";
const verifySid = "VA4e96cd8b29166cbecf0922d68bf3584c";
const client = require("twilio")(accountSid, authToken);
client.verify.v2
    .services(verifySid)
    .verifications.create({ to: "+84355352217", channel: "sms" })
    .then((verification) => console.log(verification.status))
    .then(() => {
        const readline = require("readline").createInterface({
            input: process.stdin,
            output: process.stdout,
        });
        readline.question("Please enter the OTP:", (otpCode) => {
            client.verify.v2
                .services(verifySid)
                .verificationChecks.create({ to: "+84355352217", code: otpCode })
                .then((verification_check) => console.log(verification_check.status))
                .then(() => readline.close());
        });
    });
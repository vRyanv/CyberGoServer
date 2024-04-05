const admin = require("firebase-admin");
const service_account_key = require('../../env/cyberspace-firebase-adminsdk-key.json');
admin.initializeApp({
    credential: admin.credential.cert(service_account_key)
});
const FCMService = {
    SendSingleNotification(data, token){
        const message = {data, token}
        admin.messaging().send(message)
            .then((response) => {
                console.log('FCM send::', response);
            })
            .catch((error) => {
                console.log('FCM send error:', error);
            });
    },
    SendMultiNotification(data, tokens){
        const message = {data, tokens}
        admin.messaging().sendEachForMulticast(message)
            .then((response) => {
                console.log('FCM send::', response);
            })
            .catch((error) => {
                console.log('FCM send error:', error);
            });
    }
}

module.exports = FCMService
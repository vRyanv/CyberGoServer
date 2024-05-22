// // const axios = require('axios')
// //
// // const send = () => {
// //     const url = 'https://fcm.googleapis.com/v1/projects/cyberspace-409502/messages:send'
// //     const data = {
// //         "message": {
// //             "token": "eLdGduxCSHO6HBr3Zptk2c:APA91bH2p2ftKgN-FqU6ucIMQkxe7KU5zOnO8Hr6sAKmSnhkrJxbAP52T5gfVjkgFk4Kbv5aQczv-FaEVf-wb3npOEcK5XFCXO2_mRSwvRkl08B2HYW1H6i027KvFvCTzypcYAItkkgg",
// //             "notification": {
// //                 "body": "This is an FCM notification message!",
// //                 "title": "FCM Message"
// //             }
// //         }
// //     }
// //     axios.post(
// //         url,
// //         data,
// //         {
// //             headers: {
// //                 'Authorization': 'Bearer AAAAdPk5rVs:APA91bGBeyGV0GPBLnhKt9mIAFDEnpBpLovPAwsTP9wEKNycJp1PSgWm5MiB_u7dJ8nFuEe56VVYyBcJjpG1PkA9r8mzn_YuqDSsvSRBl_GMln9lC26g66NYb3OFM6pwFrrL8t7iJcVG'
// //             }
// //         }
// //     ).then((response) => {
// //         console.log(response.response.data)
// //         if(response.response.data.error){
// //             console.log(response.response.data.error)
// //         }
// //     }).catch((error) => {
// //         console.log(error.response.data)
// //     })
// // }
// //
// // send()
// const admin = require("firebase-admin");

// const service_account = require('../env/cyberspace-firebase-adminsdk-key.json');

// admin.initializeApp({
//     credential: admin.credential.cert(service_account)
// });

// const registrationToken = 'eLdGduxCSHO6HBr3Zptk2c:APA91bH2p2ftKgN-FqU6ucIMQkxe7KU5zOnO8Hr6sAKmSnhkrJxbAP52T5gfVjkgFk4Kbv5aQczv-FaEVf-wb3npOEcK5XFCXO2_mRSwvRkl08B2HYW1H6i027KvFvCTzypcYAItkkgg';

// const message = {
//     data: {
//         score: '850',
//         time: '2:45'
//     },
//     token: registrationToken
// };

// admin.messaging().send(message)
//     .then((response) => {
//         console.log('Successfully sent message:', response);
//     })
//     .catch((error) => {
//         console.log('Error sending message:', error);
//     });

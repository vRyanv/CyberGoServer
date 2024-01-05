require('dotenv').config({path: "src/.env"})
// const mail_service = require('../api/services/mail.service')
const user = require('../api/models/user.repository')
const database = require('../config/connect-db')
database.connect()
const v8 = require('v8');
async function a(){
    const result1 = await user.searchByEmail('khangok1610@gmail.com')
    console.log(result1)
}

a()
// let content = '<h1>Hello<h1>'
// async function mail(){
//     let result = await mail_service(
//         process.env.EMAIL,
//         'khangnngcc200043@fpt.edu.vn',
//         'cyber go test send mail',
//         content
//     )
//     console.log(result)
// }
// mail()

// const accountSid = "ACc3434680f2645a9b6f528e047e307a7f";
// const authToken = "cf743520ec44cf40ef54acdc77310266"
// const verifySid = "VA4e96cd8b29166cbecf0922d68bf3584c";
// const client = require("twilio")(accountSid, authToken);

// client.verify.v2
//   .services(verifySid)
//   .verifications.create({ to: "+84374463592", channel: "sms" })
//   .then((verification) => console.log(verification.status))
//   .then(() => {
//     const readline = require("readline").createInterface({
//       input: process.stdin,
//       output: process.stdout,
//     });
//     readline.question("Please enter the OTP:", (otpCode) => {
//       client.verify.v2
//         .services(verifySid)
//         .verificationChecks.create({ to: "+84355352217", code: otpCode })
//         .then((verification_check) => console.log(verification_check.status))
//         .then(() => readline.close());
//     });
//   });


// require('dotenv').config({path: "src/.env"})
// console.log(process.env);process.env.NODE_ENV
// const { Sequelize, DataTypes } = require("sequelize");

// const sequelize = new Sequelize(
//     process.env.DB_NAME,
//     process.env.DB_USERNAME,
//     process.env.DB_PASS,
//      {
//        host: process.env.DB_HOST,
//        dialect: 'mysql'
//      }
//    );
 
//  sequelize.authenticate().then(() => {
//     console.log('Connection has been established successfully.');
//  }).catch((error) => {
//     console.error('Unable to connect to the database: ', error);
//  });
// let countries = require('../countries.json')
// let index = 0;
// countries.map((c)=>{
//     index++
// })
//
// console.log(index)


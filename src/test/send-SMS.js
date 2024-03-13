// const http = require('http');
// const https = require('https');
// const ACCESS_TOKEN = "vKEIT0I7oIb5CpqaW9x5Gb5yVohv8PMi";
//
// const sendSMS = function(phones, content, type, sender) {
//     let url = 'api.speedsms.vn';
//     let params = JSON.stringify({
//         to: phones,
//         content: content,
//         sms_type: type,
//         sender: sender
//     });
//
//     let buf = new Buffer(ACCESS_TOKEN + ':x');
//     let auth = "Basic " + buf.toString('base64');
//     const options = {
//         hostname: url,
//         port: 443,
//         path: '/index.php/sms/send',
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//             'Authorization': auth
//         }
//     };
//
//     const req = https.request(options, function(res) {
//         res.setEncoding('utf8');
//         let body = '';
//         res.on('data', function(d) {
//             body += d;
//         });
//         res.on('end', function() {
//             let json = JSON.parse(body);
//             if (json.status === 'success') {
//                 console.log("send sms success")
//             }
//             else {
//                 console.log("send sms failed " + body);
//             }
//         });
//     });
//
//     req.on('error', function(e) {
//         console.log("send sms failed: " + e);
//     });
//
//     req.write(params);
//     req.end();
// }
//
// //send test sms
// sendSMS(['+84374463592'], "test send SMS", 2, '');
// const mapService = require('../app/services/map.service')
//
// async function search(){
//    let result = await mapService.SearchAddress('lý tự trong, cần thơ', 10)
//     console.log(result)
// }
//
// search()
//
//
// let lat = 10.0342205
// let long = 105.7797728
// // 32.42961626387935, 105.80719863691581
// async function get(){
//     let result = await mapService.ReverseGeoCoding(lat, long)
//     console.log(result)
//
// }
//
// // get()

// Chuỗi mẫu

// const s1 = "mjebRoqgwhEbPw\vu@qeCtDoLrAwFuGaBis@kRyEoA_RsEsLwAaTUcLnBeS~Dkc@vIwDp@}sAbWuq@hMiKlBip@pLqo@jLa[zF__@lFqj@bHmBTuN|AcGd@oF^_P|@csFnVyLz@sLrAos@nKs@Jan@|Ioc@bGaEj@oi@`HahAcpAeFnGzRdUxh@xm@lAtAtFbH";
// const s2 = "cqpbRsikwhE|_BsXjKiB_BgJiKlBip@pLqo@jLa[zF__@lFqj@bHmBTuN|AcGd@oF^_P|@csFnVyLz@sLrAos@nKs@Jan@|Ioc@bGaEj@oi@`HahAcpAsKuL{Xa[kKsLqH{IgJuJmJ{J";

// const target_date = new Date('2024-04-22');
//     const date_start = new Date(
//       target_date.getFullYear(),
//       target_date.getMonth(),
//       target_date.getDate()
//     );
// console.log(target_date)
// const target_date = new Date('2024-04-22');
// console.log(target_date)
// let trip = {
//     start_date: new Date("2024-04-22"),
// }
// trip.start_date = 1
// console.log(trip)

// const origin_city = undefined || "asd";
// console.log(origin_city)
// return
// const origin_state  = undefined; 
// const origin_county  = "asdas"; 
// const t = "asdas"
// if(origin_city == t || origin_state == t || origin_county == t){
//     console.log("true")
// }

// Function to calculate Levenshtein Distance between two strings
// function levenshteinDistance(str1, str2) {
//     const m = str1.length;
//     const n = str2.length;
//     const dp = Array.from(Array(m + 1), () => Array(n + 1).fill(0));

//     for (let i = 0; i <= m; i++) {
//         for (let j = 0; j <= n; j++) {
//             if (i === 0) {
//                 dp[i][j] = j;
//             } else if (j === 0) {
//                 dp[i][j] = i;
//             } else {
//                 const cost = str1[i - 1] === str2[j - 1] ? 0 : 1;
//                 dp[i][j] = Math.min(
//                     dp[i - 1][j] + 1,
//                     dp[i][j - 1] + 1,
//                     dp[i - 1][j - 1] + cost
//                 );
//             }
//         }
//     }

//     return dp[m][n];
// }

// Function to compare two geometries
// function compareGeometries(geometry1, geometry2) {
//     let totalDistance = levenshteinDistance(geometry1, geometry2)
//     const totalLength = Math.max(geometry1.length, geometry2.length);
//     const similarity = 1 - (totalDistance / totalLength);
//     return similarity;
// }

// console.log(you.length)
// let you = ""
// for(let i = 0; i < 16000;i++){
//         you += "a"
// }
// console.log(you.length)
// return
// console.log(you.length)
// let a = ""
// let b = ""
// for(let i = 0; i < 20000;i++){
//     a += me
//     b += me 
// }
// console.log("a", a.length)
// const t4 = "0123456789"
// const res1 = CompareRouteByGeometry(t1, me)
// const res2 = CompareRouteByGeometry(t2, me)
// const res3 = CompareRouteByGeometry(t3, me)

// const res_total = compareGeometries("youb", "b")
// console.log("res1", res1)
// console.log("res2", res2)
// console.log("res3", res3)
// console.log("total", res1 + res2 + res3)
// console.log("res_total",res_total)


// Ví dụ về sử dụng
const {MapService} = require('../app/services')

const str1 = "kejbR{c`whErDbAlz@}pBzR_OrB_FZu@vDq@vBeE|MqWgEiCoPr\\U~E[t@sB~EyJ`QcE|Ia~@zwB{mAn}Ccx@vtB_CnF}EfFiVvo@";
const str2 = "e_ibRgxmwhEfB~IvDs@v_A}QjJaB~N@pLhCnPnDng@lNdKrClHrBrAwFxBoGfOqi@zE_QvDcNdIwY`Oge@~DkMeGiBoY{J{`@eKkOoFeKqFeK{HeIyHyMuPg\cd@oYib@{[ye@y`@}i@kMuPeMmPom@ov@yUc\_V{[q[ke@aGkImIqLeRmVie@om@{Ye`@cQmUiWa^wSiWkoAm_BytAckB_~A_wBw}@apAq~@}nAavAagBkz@eiA";
const distance = MapService.CompareRouteByGeometry(str1, str2);
console.log("Damerau-Levenshtein distance:", distance);
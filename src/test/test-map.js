const mapService = require('../api/services/map.service')


let lat = 11.218468421238196
let long = 108.7355282789391
// 11.218468421238196, 108.7355282789391
async function get(){
    let result = await mapService.ReverseGeoCoding(lat, long)
    console.log(result.data)
}

get()

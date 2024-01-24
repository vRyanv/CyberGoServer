const mapService = require('../api/services/map.service')


let lat = 32.42961626387935
let long = 105.80719863691581
// 32.42961626387935, 105.80719863691581
async function get(){
    let result = await mapService.ReverseGeoCoding(lat, long)
    console.log(result.data)
}

get()

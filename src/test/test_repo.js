const database = require('../config/connect-db')
database.connect()
const {VehicleRepository} = require('../app/repositories')
const driver_id = "65bf65812f6c80bd4c21eb3d"
VehicleRepository.GetAllVehicleAcceptedOfDriver(driver_id)
    .then(result => {
        console.log(result)
    }).catch(error => {
    console.log(error)
})
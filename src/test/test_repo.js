const database = require('../config/connect-db')
database.connect()
const {TripRepository} = require('../app/repositories')
const {Trip} = require('../app/schemas')

async function a(){
    const condition = {
        $or: [
            { 'origin_city': "Thành phố ddCần Thơ" },
            { 'origin_state': "vvv" },
            { 'origin_county': "Thành v Cần Thơ" },
            { 'origin_address': "Đường Võ Nguyên Giáp, Phường Hưng Thạnh, Quận Cái Răng, Thành phố Cần Thơ, 94111, Việt Nam" },
          ]
    }
    const res = await TripRepository.FindTripMatchUser(condition)
    console.log(res);
}

const conditions = [
    { 'origin_city': "Thành phố Cần Thơ" },
    { 'origin_state': "vvv" },
    { 'origin_county': "Thành v Cần Thơ" },
    { 'origin_address': "Đường Võ Nguyên Giáp, Phường Hưng Thạnh, Quận Cái Răng, Thành phố Cần Thơ, 94111, Việt Nam" }
]

const destination_condition = [
    { 'city': "Thành phố Cần Thơ" },
    { 'state': "vvv" },
    { 'county': "Thành v Cần Thơ" },
    { 'ddress': "Đường 94111, Việt Nam" }
]

Trip.aggregate([
    {
        $match: {
            $or: conditions
        }
    },
    {
        $lookup: {
            from: 'destinations',
            localField: 'destinations',
            foreignField: '_id',
            as: 'destinations'
        }
    },
    {
        $match: {
            $or: destination_condition
        }
    },
]).then(trips => {
    console.log(trips);
}).catch(err=>{
    console.log(err);
})

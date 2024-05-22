const mongoose = require('mongoose')
require('colors')
const {Database} = require('../env')
async function connect()
{
    try{
        await mongoose.connect(Database.CONNECTION_STRING)
        console.log('Connect mongodb successfully!'.green)
    }catch(error){
        console.log('Connect mongodb failure!'.red)
    }
}

module.exports = {connect}
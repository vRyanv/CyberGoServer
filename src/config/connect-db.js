const mongoose = require('mongoose')
require('colors')
async function connect()
{
    try{
        await mongoose.connect('mongodb://127.0.0.1:27017/cyber-go')
        console.log('Connect mongodb successfully!'.green)
    }catch(error){
        console.log('Connect mongodb failure!'.red)
    }
}

module.exports = {connect}
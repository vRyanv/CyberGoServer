//add library
const express = require('express')
const cookieParser = require('cookie-parser')
var cors = require('cors')
require('colors');

const routes = require('./api/routes/index.route')

const path = require('path')
require('dotenv').config({path: "src/.env"})


const app = express()
app.use(cors())
//[GET] image from public
app.use(express.static(path.join(__dirname, 'public')))

//middleware to get post method value
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cookieParser())

if(process.env.PROJECT_MODE === 'dev'){
//add library dev
const morgan = require('morgan')
// HTTP logger for dev
app.use(morgan('combined'))
}

// Rout init
routes(app)
const database = require('./config/connect-db')
database.connect()

const port = process.env.SERVER_PORT_DEV;
const ip = process.env.SERVER_IP_DEV
app.listen(port, ip, () => console.log(`Server started`.yellow + `\nListening request on ${ip}:${port} `.green))
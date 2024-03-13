const path = require('path')

//add library
const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require('cors')
require('colors');

const routes = require('./app/routes')

const app = express()
app.use(cors())
//[GET] image from public
app.use(express.static(path.join(__dirname, 'public')))

//middleware to get post method value
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cookieParser())

const morgan = require('morgan')
// HTTP logger
app.use(morgan('combined'))

// Rout init
routes(app)
const database = require('./config/connect-db')
database.connect()

const {ServerEnv} = require('./env')
const PORT = ServerEnv.SERVER_PORT_DEV;
const IP = ServerEnv.SERVER_IP_DEV
app.listen(
    PORT,
    IP,
    () => console.log(`Server started`.yellow + `\nListening request on ${IP}:${PORT} `.green)
)
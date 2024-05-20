const path = require('path')

//add library
const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require('cors')
require('colors');

const routes = require('./app/routes')

const app = express()
const option_cors = {
    origin: '*',
    methods: 'GET, HEAD, PUT, PATCH, POST, DELETE',
    withCredentials: false,
    optionsSuccessStatus: 204
}

app.use(function(req, res, next) {
    console.log('here')
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'DELETE, PUT, GET, POST');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
 });
app.use(cors(option_cors))

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

const http = require("http");
const server = http.createServer(app);
const io = require("socket.io")(server,{
    cors:{
        origin: '*',
        methods: '*'
    }
});

global.__user_sockets = new Map()

const {JWT} = require("./app/utils");
io.use((socket, next) => {
    const token = socket.handshake.auth.token
    const user = JWT.Verify(token)
    if (user) {
        socket.user = user
        __user_sockets.set(user.id, socket)
        next();
    } else {
        console.log("unauthorized socket");
        next(new Error("unauthorized"));
    }
})

const {SocketService} = require('./app/services')
SocketService(io)


const {ServerEnv} = require('./env')
const PORT = ServerEnv.SERVER_PORT_DEV;
const IP = ServerEnv.SERVER_IP_DEV
server.listen(
    PORT,
    IP,
    () => console.log(`Server started`.yellow + `\nListening request on ${IP}:${PORT} `.green)
)

const MapRouter = require('./MapRouter')
const SecurityRouter = require('./security')
const UserRouter = require('./user')
const AdminRouter = require('./admin')
const TripRouter = require('./trip/TripRouter')
const RatingRouter = require('./RatingRouter')
const ChatRouter = require('./ChatRouter')

module.exports = {
    ChatRouter,
    RatingRouter,
    AdminRouter,
    MapRouter,
    SecurityRouter,
    UserRouter,
    TripRouter
}
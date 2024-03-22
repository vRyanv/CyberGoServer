const {
    SecurityRouter,
    MapRouter,
    UserRouter
} = require('./router')

const {Auth} = require('../middleware')
const {Role} = require('../constant')

module.exports = (app) => {
    app.use('/security', SecurityRouter)
    app.use(
        '/map',
        MapRouter
    )
    app.use(
        '/user',
        (req, res, next) => Auth(req, res, next, [Role.USER, Role.DRIVER]),
        UserRouter
    )

    app.post('/test', (req, res) => {
        console.log(req.header('Authorization'));
        console.log(req.headers);
        res.send({data: req.header})
    })
}
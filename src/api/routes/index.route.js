const signUpRouter = require('./sign-up.route');
const signInRouter = require('./sign-in.route');
const mapRouter = require('./map.route');
const multerUpload = require('../middleware/multer.upload');
module.exports = (app) =>{
    app.use('/sign-in', signInRouter)
    app.use('/sign-up', signUpRouter)
    app.use('/map', mapRouter)
    // app.post('/test', multerUpload.single('image'),(req, res) =>{
    //     console.log(req.body);
    //     console.log(req.file);
    //     res.send({status:201, body:req.file})
    // })

        app.post('/test', (req, res) =>{
            console.log(req.header('Authorization'));
            console.log(req.headers);
            res.send({data:req.header})
        })
}
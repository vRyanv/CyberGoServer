const {StatusCode} = require('../../constant')

const UserController = {
    DriverRegistration(req, res){
        console.log(req.files)
        console.log(req.body)
        return res.status(200).json({code: StatusCode.BAD_REQUEST, errors: 'BAD_REQUEST'})
    }
}

module.exports = UserController
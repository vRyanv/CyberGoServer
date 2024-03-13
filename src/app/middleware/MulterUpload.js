const multer = require('multer')
const {MimeType, ErrorType} = require('../constant')
const storage = (path) => {
    return multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, path)
        },
        filename: function (req, file, cb) {
            cb(null, Date.now() + file.originalname);
        }
    })
}

function upload(path) {
    return multer({
        storage: storage(path),
        fileFilter: function (req, file, cb) {
            if (file.mimetype === MimeType.PNG || file.mimetype === MimeType.JPEG ||
                file.mimetype === MimeType.JPG || file.mimetype === MimeType.WEBP)
            {
                req.body.contain_file = true
                cb(null, true)
            } else {
                req.body.error_upload = ErrorType.INVALID_IMAGE
                return cb(null, false, new Error('goes wrong on the mimetype'))
            }
        }
    })
}

module.exports = upload
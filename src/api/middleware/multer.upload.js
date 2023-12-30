const multer = require("multer");
const os = require("os");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, os.tmpdir());
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});
module.exports = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    if (
      file.mimetype === "image/png" ||
      file.mimetype === "image/jpeg" ||
      file.mimetype === "image/jpg"
    ) {
      req.hasImg = true;
      cb(null, true);
    } else {
      req.errorUpload = "invalid image";
      return cb(null, false, new Error("goes wrong on the mimetype"));
    }
  },
});

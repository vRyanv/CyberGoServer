const {
    SecurityRouter,
    MapRouter,
    UserRouter,
    AdminRouter,
    TripRouter,
    RatingRouter,
    ChatRouter,
    NotificationRouter
} = require("./router");
const {Twilio} = require('../utils')
const {Auth} = require("../middleware");
const {Role, StatusCode} = require("../constant");

module.exports = (app) => {
    app.post("/api/resend-otp-code", (req, res) => {
        const {national_phone} = req.body
        Twilio.SendOTP(national_phone).then((result) => {
            console.log(result);
            if (result.status == "pending") {
                return res.status(200).json({code: StatusCode.OK})
            }
            return res.status(200).json({code: StatusCode.BAD_REQUEST})
        }).catch(error => {
            console.log(error)
            return res.status(200).json({code: StatusCode.BAD_REQUEST})
        });
    });

    app.use(
        "/api/chat",
        (req, res, next) => Auth(req, res, next, [Role.USER, Role.ADMIN]),
        ChatRouter
    );
    app.use(
        "/api/rating",
        (req, res, next) => Auth(req, res, next, [Role.USER, Role.ADMIN]),
        RatingRouter
    );

    app.use(
        "/api/trip",
        (req, res, next) => Auth(req, res, next, [Role.USER, Role.ADMIN]),
        TripRouter
    );

    app.use("/api/security", SecurityRouter);

    app.use("/api/map", MapRouter);

    app.use(
        "/api/user",
        (req, res, next) => Auth(req, res, next, [Role.USER, Role.ADMIN]),
        UserRouter
    );

    app.use(
        "/api/admin",
        (req, res, next) => Auth(req, res, next, [Role.ADMIN]),
        AdminRouter
    );

    app.use('/api/notification', NotificationRouter)

    app.use("/api/*", (req, res) => {
        res
            .status(400)
            .json({code: StatusCode.NOT_FOUND, message: "api not found"});
    });
};

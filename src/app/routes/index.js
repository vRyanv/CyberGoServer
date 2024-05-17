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
    app.post("/resend-otp-code", (req, res) => {
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
        "/chat",
        (req, res, next) => Auth(req, res, next, [Role.USER, Role.ADMIN]),
        ChatRouter
    );
    app.use(
        "/rating",
        (req, res, next) => Auth(req, res, next, [Role.USER, Role.ADMIN]),
        RatingRouter
    );

    app.use(
        "/trip",
        (req, res, next) => Auth(req, res, next, [Role.USER, Role.ADMIN]),
        TripRouter
    );

    app.use("/security", SecurityRouter);

    app.use("/map", MapRouter);

    app.use(
        "/user",
        (req, res, next) => Auth(req, res, next, [Role.USER, Role.ADMIN]),
        UserRouter
    );

    app.use(
        "/admin",
        (req, res, next) => Auth(req, res, next, [Role.ADMIN]),
        AdminRouter
    );

    app.use('/notification', NotificationRouter)

    app.post("/test", (req, res) => {
        console.log(req.header("Authorization"));
        console.log(req.headers);
        res.send({data: req.header});
    });

    app.use("/*", (req, res) => {
        res
            .status(400)
            .json({code: StatusCode.NOT_FOUND, message: "api not found"});
    });
};

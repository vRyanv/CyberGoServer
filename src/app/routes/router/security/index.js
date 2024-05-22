const express = require("express");
const route = express.Router();
const SignInRouter = require("./SignInRouter");
const SignUpRouter = require("./SignUpRouter");
const TwoFactorAuthenticationRouter = require("./TwoFactorAuthenticationRouter");
const {SecurityController} = require("../../../controllers");
const {Auth} = require("../../../middleware");
const {Role} = require("../../../constant");

route.use("/sign-in", SignInRouter);
route.use("/sign-up", SignUpRouter);
route.put(
    "/firebase-token",
    (req, res, next) =>
        Auth(req, res, next, [Role.USER, Role.DRIVER, Role.ADMIN]),
    SecurityController.UpdateFirebaseToken
);
route.put("/update-password",
    (req, res, next) =>
        Auth(req, res, next, [Role.USER, Role.DRIVER, Role.ADMIN]),
    SecurityController.UpdatePasswordAction);

route.use(
    '/2fa',
    TwoFactorAuthenticationRouter
);

route.post(
    '/forgot-password',
    SecurityController.ForgotPasswordAction
)

route.put(
    '/reset-password',
    SecurityController.ResetPasswordAction
)
module.exports = route;

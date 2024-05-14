const {
  SecurityRouter,
  MapRouter,
  UserRouter,
  AdminRouter,
  TripRouter,
  RatingRouter
} = require("./router");

const { Auth } = require("../middleware");
const { Role, StatusCode } = require("../constant");

module.exports = (app) => {
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

  app.post("/test", (req, res) => {
    console.log(req.header("Authorization"));
    console.log(req.headers);
    res.send({ data: req.header });
  });

  app.use("/*", (req, res) => {
    res
      .status(400)
      .json({ code: StatusCode.NOT_FOUND, message: "api not found" });
  });
};

const jwt = require("jsonwebtoken");
require("dotenv").config({ path: "../.env" });

class Authorization {
  check(roles, req, res, next) {
    try {
      let token = req.header("Authorization").split(" ")[1];
      let decode = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
      const result = decode.roles.some((role) => {
        return roles.includes(role);
      });
      if (result) {
        next();
      } else {
        res.send({ status: 401, message: "invalid Bearer token" });
      }
    } catch (error) {
      res.send({ status: 401, message: "invalid Bearer token" });
    }
  }
}

module.exports = new Authorization;

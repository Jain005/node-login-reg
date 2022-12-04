const { authJwt, verifySignup } = require("./middleware");
const controller = require("./controllers/auth");
const { checkSchema } = require("express-validator");

module.exports = (app) => {
  app.post(
    "/api/signup",
    checkSchema(verifySignup.registrationSchema),
    controller.signup
  );
  app.post(
    "/api/signin",
    checkSchema(verifySignup.loginSchema),
    controller.signin
  );
  app.get("/api/user", [authJwt.verifyToken], controller.userDetail);
};

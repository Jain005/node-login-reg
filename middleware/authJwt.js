const jwt = require("jsonwebtoken");

verifyToken = (req, res, next) => {
  let token = req.headers["authorization"];

  if (!token) {
    return res.status(403).send({ message: "No token provided!" });
  }

  const bearer = token.split(" ");
  //Get token from string
  const bearerToken = bearer[1];

  jwt.verify(bearerToken, process.env.jwtSecret, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Unauthorized!" });
    }
    req.userId = decoded.userId;
    next();
  });
};

const authJwt = {
  verifyToken,
};
module.exports = authJwt;

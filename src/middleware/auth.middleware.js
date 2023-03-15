const jwt = require("jsonwebtoken");
const config = require("../config");

class AuthMiddleware {

  verifyToken(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ message: "Authorization header missing" });
    }
    const token = authHeader.split(" ")[1];
    try {
      const decodedToken = jwt.verify(token, config.jwt.secret);
      req.userData = decodedToken;
      next();
    } catch (error) {
      return res.status(401).json({ message: "Invalid token" });
    }
  }

}

module.exports = new AuthMiddleware();

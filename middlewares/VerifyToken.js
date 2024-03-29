const jwt = require("jsonwebtoken");

const VerifyToken = (req, res, next) => {
  const authHeader = req.header("X-auth-token");

  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
      if (err) res.status(401).json("Token is not valid");
      req.user = user;
      next();
    });
  } else {
    return res.status(403).json("you are not authenticated");
  }
};

module.exports = { VerifyToken };

const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: "Token not provider" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);

    if (!decoded) {
      return res.status(401).json({ message: "Invalid token" });
    }

    req.body.user = decoded.user;
    next();
  } catch (error) {
    console.log(error.message);
    return res
      .status(401)
      .json({ message: "Internal server error at authMe middleware" });
  }
};

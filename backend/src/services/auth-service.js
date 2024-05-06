const jwt = require("jsonwebtoken");

function generateAccessToken(payload) {
  const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
    expiresIn: "30m",
  });
  return accessToken;
}

module.exports = { generateAccessToken };

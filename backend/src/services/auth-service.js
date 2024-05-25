const jwt = require("jsonwebtoken");

function generateAccessToken(payload) {
  const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
    expiresIn: "1d",
  });
  return accessToken;
}

function validateEmail(email) {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
}

function validatePassword(password) {
  const re = /^(?=.*\d).{6,}$/;
  return re.test(password);
}

module.exports = { generateAccessToken, validateEmail, validatePassword };

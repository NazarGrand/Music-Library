const jwt = require("jsonwebtoken");

function generateAccessToken(payload) {
  const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
    expiresIn: "30m",
  });
  return accessToken;
}

function validateEmail(email) {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
}

function validatePassword(password) {
  const re = /^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{6,}$/;
  return re.test(password);
}

module.exports = { generateAccessToken, validateEmail, validatePassword };

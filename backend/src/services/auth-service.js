const jwt = require("jsonwebtoken");
const UserModel = require("../models/user-model");

function generateToken(payload, jwtSecret, tokenExpiration) {
  const token = jwt.sign(payload, jwtSecret, {
    expiresIn: tokenExpiration,
  });
  return token;
}

async function saveRefreshToken(userId, refreshToken) {
  const user = await UserModel.findOne({ _id: userId });

  if (user) {
    user.refreshToken = refreshToken;
    return user.save();
  }
}

async function removeToken(refreshToken) {
  const userData = await UserModel.updateOne(
    { refreshToken },
    { $unset: { refreshToken: 1 } }
  );
  return userData;
}

function validateEmail(email) {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
}

function validatePassword(password) {
  const re = /^(?=.*\d).{6,}$/;
  return re.test(password);
}

module.exports = {
  generateToken,
  saveRefreshToken,
  removeToken,
  validateEmail,
  validatePassword,
};

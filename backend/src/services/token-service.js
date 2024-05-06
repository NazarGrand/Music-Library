const jwt = require("jsonwebtoken");
const userModel = require("../models/user-model");

class TokenService {
  generateAccessToken(payload) {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
      expiresIn: "30m",
    });
    return accessToken;
  }

  //   async saveToken(userId, accessToken) {
  //     const tokenData = await userModel.findOne({ user: userId });
  //     if (tokenData) {
  //       tokenData.accessToken = accessToken;
  //       return tokenData.save();
  //     }
  //     const token = await tokenModel.create({ user: userId, refreshToken });
  //     return token;
  //   }
}

module.exports = new TokenService();

const UserModel = require("../models/user-model");
const VerificationModel = require("../models/verification-model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const uuid = require("uuid");
const tokenService = require("./token-service");
const UserDto = require("../dtos/user-dto");
const mailService = require("./mail-service");

class UserService {
  async registration(email, password) {
    const isUserExist = await UserModel.findOne({ email });

    if (isUserExist) {
      throw new Error(`User with an email address ${email} already exists`);
    }

    const saltRounds = 10;
    const hashPassword = await bcrypt.hash(password, saltRounds);

    const createToken = (payload, tokenSecret, expiresIn) => {
      const token = jwt.sign(payload, tokenSecret, { expiresIn });
      return token;
    };

    const verificationToken = createToken(
      { email },
      process.env.JWT_ACCESS_SECRET,
      "1h"
    );

    const user = await UserModel.create({
      email,
      password: hashPassword,
      status: "pending",
    });

    await VerificationModel.create({
      user: user._id,
      isTokenUsed: false,
      verificationToken,
    });

    await mailService.sendActivationMail(
      email,
      `${process.env.API_URL}/api/activate?token=${verificationToken}`
    );

    const userDto = new UserDto(user);
    return { user: userDto };
  }

  async activate(verificationToken) {
    const decoded = jwt.verify(
      verificationToken,
      process.env.JWT_ACCESS_SECRET
    );

    if (!decoded) {
      return new Error("Already verified");
    }

    const verificationUser = await VerificationModel.findOne({
      verificationToken,
    });

    if (!verificationUser) {
      throw new Error("Incorrect token");
    }

    if (!verificationUser.isTokenUsed) {
      verificationUser.isTokenUsed = true;

      await UserModel.findOneAndUpdate(
        { _id: verificationUser.user },
        { status: "active" }
      );
    }
    await verificationUser.save();
  }
}

module.exports = new UserService();

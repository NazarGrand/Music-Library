const UserModel = require("../models/user-model");
const bcrypt = require("bcrypt");
const uuid = require("uuid");
const tokenService = require("./token-service");
const UserDto = require("../dtos/user-dto");

class UserService {
  async registration(email, password) {
    const candidate = await UserModel.findOne({ email });

    if (candidate) {
      throw new Error(`User with an email address ${email} already exists`);
    }

    const hashPassword = await bcrypt.hash(password, 4);
    const activationLink = uuid.v4();

    const userDto = new UserDto(user);
    const accessToken = tokenService.generateAccessToken({ ...userDto });

    const user = await UserModel.create({
      email,
      password: hashPassword,
      activationLink,
      accessToken,
    });

    return { ...tokens, user: userDto };
  }
}

module.exports = new UserService();

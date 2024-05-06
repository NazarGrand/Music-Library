const UserModel = require("../models/user-model");
const VerificationModel = require("../models/verification-model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { generateAccessToken } = require("./auth-service");
const UserDto = require("../dtos/user-dto");
const createMailService = require("./mail-service");

const myMailService = createMailService();

async function registration(email, password) {
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

  await myMailService.sendActivationMail(
    email,
    `${process.env.API_URL}/api/activate?token=${verificationToken}`
  );

  const userDto = new UserDto(user);
  return { user: userDto };
}

async function activate(verificationToken) {
  const decoded = jwt.verify(verificationToken, process.env.JWT_ACCESS_SECRET);

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

async function login(email, password) {
  const user = await UserModel.findOne({ email });

  if (!user) {
    throw new Error(`Invalid email or password`);
  }

  const isPassEquals = await bcrypt.compare(password, user.password);
  if (!isPassEquals) {
    throw new Error("Invalid email or password");
  }

  if (user.status !== "active") {
    throw new Error("Accout not verified");
  }

  const userDto = new UserDto(user);
  const accessToken = generateAccessToken({ ...userDto });

  return { accessToken, user: userDto };
}

module.exports = {
  registration,
  activate,
  login,
};

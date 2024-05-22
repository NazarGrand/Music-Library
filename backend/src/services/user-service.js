const UserModel = require("../models/user-model");
const VerificationModel = require("../models/verification-model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const {
  generateAccessToken,
  validateEmail,
  validatePassword,
} = require("./auth-service");

const UserDto = require("../dtos/user-dto");
const { deliverMail } = require("./mail-service");
const { verificationTemplate } = require("../views/templates");

async function registration(email, password) {
  if (!validateEmail(email)) {
    throw new Error("Invalid email address");
  }

  const isUserExist = await UserModel.findOne({ email });

  if (isUserExist) {
    throw new Error(`User with an email address ${email} already exists`);
  }

  if (!validatePassword(password)) {
    throw new Error("Password does not match the requirements");
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

  const subject = "Account activation on " + process.env.API_URL;
  const template = verificationTemplate(
    email,
    `${process.env.CLIENT_URL}/account-activated?token=${verificationToken}`
    // `${process.env.API_URL}/api/verify-user?token=${verificationToken}`
  );

  await deliverMail(email, subject, template);

  const userDto = new UserDto(user);
  return { user: userDto };
}

async function verifyUser(verificationToken) {
  const decoded = jwt.verify(verificationToken, process.env.JWT_ACCESS_SECRET);

  if (!decoded) {
    return new Error("Incorrect token");
  }

  const verificationUser = await VerificationModel.findOne({
    verificationToken,
  });

  if (!verificationUser) {
    throw new Error("Incorrect token");
  }

  if (verificationUser.isTokenUsed) {
    throw new Error("The user is already verified");
  } else {
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
    throw new Error("Account not verified");
  }

  const userDto = new UserDto(user);
  const accessToken = generateAccessToken({ user: { ...userDto } });

  return { accessToken, user: userDto };
}

async function me(idUser) {
  const user = await UserModel.findOne({ _id: idUser });

  if (!user) {
    throw new Error("No such user exists");
  }

  const userDto = new UserDto(user);
  return { user: userDto };
}

module.exports = {
  registration,
  verifyUser,
  login,
  me,
};

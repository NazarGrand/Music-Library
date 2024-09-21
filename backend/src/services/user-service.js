const UserModel = require("../models/user-model");
const VerificationModel = require("../models/verification-model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { ObjectId } = require("mongoose").Types;

const {
  generateToken,
  saveRefreshToken,
  validateEmail,
  validatePassword,
} = require("./auth-service");

const UserDto = require("../dtos/user-dto");
const { deliverMail } = require("./mail-service");
const { verificationTemplate } = require("../views/templates");

async function registration(userName, email, password) {
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
    { userName, email },
    process.env.JWT_ACCESS_SECRET,
    "1h"
  );

  const user = await UserModel.create({
    userName,
    email,
    password: hashPassword,
    status: "pending",
    role: "user",
  });

  await VerificationModel.create({
    user: user._id,
    isTokenUsed: false,
    verificationToken,
  });

  const subject = "Account activation on Music Library";
  const template = verificationTemplate(
    userName,
    `${process.env.CLIENT_URL}/account-activated?token=${verificationToken}`
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

  const accessToken = generateToken(
    {
      user: { ...userDto },
    },
    process.env.JWT_ACCESS_SECRET,
    "15m"
  );

  const refreshToken = generateToken(
    {
      user: { ...userDto },
    },
    process.env.JWT_REFRESH_SECRET,
    "14d"
  );

  await saveRefreshToken(userDto._id, refreshToken);
  return { accessToken, refreshToken, user: { ...userDto, role: user.role } };
}

async function refresh(refreshToken) {
  if (!refreshToken) {
    throw new Error("There is no refresh token.");
  }

  const decodedUser = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
  if (!decodedUser) {
    throw new Error("Invalid refresh token");
  }

  const user = await UserModel.findOne({ refreshToken });

  if (!user) {
    throw new Error("There is no user associated with this refresh token.");
  }

  const userDto = new UserDto(user);
  const accessToken = generateToken(
    {
      user: { ...userDto },
    },
    process.env.JWT_ACCESS_SECRET,
    "15m"
  );

  return { accessToken, user: userDto };
}

async function me(idUser) {
  if (!idUser) {
    throw new Error("No such id user");
  }

  const user = await UserModel.findOne({ _id: idUser });

  if (!user) {
    throw new Error("No such user exists");
  }

  const userDto = new UserDto(user);
  return { user: { ...userDto, role: user.role } };
}

async function getUserById(id) {
  const user = await UserModel.findOne({ _id: new ObjectId(id) });

  if (!user) {
    throw new Error("No such user exists");
  }

  return user;
}

module.exports = {
  registration,
  verifyUser,
  login,
  refresh,
  me,
  getUserById,
};

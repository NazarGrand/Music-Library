require("dotenv").config();

const config = {
  MONGO_URI: process.env.CONNECTION_STRING,
};

module.exports = config;

const mongoose = require("mongoose");
const config = require("./envConfig");
require("dotenv").config();

const dbConnect = async () => {
  try {
    console.log("Connection to mongo db has been started");
    await mongoose.connect(config.MONGO_URI);
  } catch (er) {
    console.log("Error connection to mongo db", er);
  }
};

mongoose.connection.on("connected", () => console.log("MongoDb connected"));
mongoose.connection.on("disconnected", () =>
  console.log("MongoDb disconnected")
);
mongoose.connection.on("reconnected", () => console.log("MongoDb reconnected"));
mongoose.connection.on("close", () => console.log("MongoDb connection close"));

dbConnect();

module.exports = dbConnect;

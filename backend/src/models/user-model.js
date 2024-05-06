const { Schema, model } = require("mongoose");

const UserSchema = new Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  // accessToken: { type: String, required: false },
  status: { type: String, required: false },
});

module.exports = model("User", UserSchema);

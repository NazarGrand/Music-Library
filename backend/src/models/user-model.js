const { Schema, model } = require("mongoose");

const UserSchema = new Schema({
  userName: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  status: { type: String, required: false },
  role: { type: String, required: true },
  favouriteTracks: [
    {
      type: Schema.Types.ObjectId,
      ref: "Track",
    },
  ],
});

module.exports = model("User", UserSchema);

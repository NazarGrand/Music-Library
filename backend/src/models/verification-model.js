const { Schema, model } = require("mongoose");

const VerificationSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User" },
  isTokenUsed: Boolean,
  verificationToken: String,
});

module.exports = model("verificationUser", VerificationSchema);

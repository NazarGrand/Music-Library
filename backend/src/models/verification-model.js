const { Schema, model } = require("mongoose");

const VerificationSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User" },
    isTokenUsed: Boolean,
    verificationToken: String,
  },
  { timestamps: true }
);

module.exports = model("verificationUser", VerificationSchema);

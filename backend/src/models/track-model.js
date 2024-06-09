const { Schema, model } = require("mongoose");

const TrackSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    artistReference: {
      type: Schema.Types.ObjectId,
      ref: "Artist",
      required: false,
    },
    albumReference: {
      type: Schema.Types.ObjectId,
      ref: "Album",
      required: false,
    },
    previewImage: {
      type: String,
      required: false,
    },
    audio: {
      type: String,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    releaseDate: {
      type: Date,
      required: true,
    },
    label: {
      type: String,
      required: false,
    },
    totalListens: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = model("Track", TrackSchema);

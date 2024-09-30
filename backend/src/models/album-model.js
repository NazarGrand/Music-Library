const { Schema, model } = require("mongoose");

const AlbumSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    previewImage: {
      type: String,
      required: false,
    },
    releaseDate: {
      type: Date,
      required: true,
    },
    artistReference: {
      type: Schema.Types.ObjectId,
      ref: "Artist",
      required: false,
    },
    tracksReferences: [
      {
        type: Schema.Types.ObjectId,
        ref: "Track",
      },
    ],
  },
  { timestamps: true }
);

module.exports = model("Album", AlbumSchema);

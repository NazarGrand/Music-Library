const { Schema, model } = require("mongoose");

const AlbumSchema = new Schema({
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
  tracksReferences: [
    {
      type: Schema.Types.ObjectId,
      ref: "Track",
    },
  ],
});

module.exports = model("Album", AlbumSchema);

const { Schema, model } = require("mongoose");

const ArtistSchema = new Schema(
  {
    name: { type: String, required: true },
    photoUrl: { type: String, required: false },
    singleSongs: [
      {
        type: Schema.Types.ObjectId,
        ref: "Track",
      },
    ],
    albums: [
      {
        type: Schema.Types.ObjectId,
        ref: "Album",
      },
    ],
  },
  { timestamps: true }
);

const Artist = model("Artist", ArtistSchema);

module.exports = Artist;

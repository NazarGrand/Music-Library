const ArtistModel = require("../models/artist-model");
const AlbumModel = require("../models/album-model");
const TrackModel = require("../models/track-model");
const mongoose = require("mongoose");

async function createArtist(artistData) {
  const isArtistExist = await ArtistModel.findOne({
    name: artistData.name,
  });

  if (isArtistExist) {
    throw new Error("Artist already exists");
  }

  return await ArtistModel.create(artistData);
}

async function getArtistById(artistId) {
  const artist = await ArtistModel.findById(artistId)
    .populate({
      path: "singleSongs",
      populate: {
        path: "artistReference",
        model: "Artist",
      },
    })
    .populate("albums");

  if (!artist) {
    throw new Error("Artist not found");
  }

  return artist;
}

async function getAllArtists() {
  return await ArtistModel.find();
}

async function updateArtist(artistId, artistData) {
  const artist = await ArtistModel.findByIdAndUpdate(artistId, artistData, {
    new: true,
    runValidators: true,
  });

  if (!artist) {
    throw new Error("Artist not found");
  }

  return artist;
}

async function deleteArtist(artistId) {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const artist = await ArtistModel.findById(artistId).session(session);
    if (!artist) {
      throw new Error("Artist not found");
    }

    await TrackModel.deleteMany({ _id: { $in: artist.singleSongs } }).session(
      session
    );

    await AlbumModel.deleteMany({ _id: { $in: artist.albums } }).session(
      session
    );

    await ArtistModel.deleteOne({ _id: artistId }).session(session);

    await session.commitTransaction();
  } catch (e) {
    await session.abortTransaction();
    throw e;
  } finally {
    session.endSession();
  }
}

module.exports = {
  createArtist,
  getArtistById,
  getAllArtists,
  updateArtist,
  deleteArtist,
};

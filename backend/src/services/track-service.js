const AlbumModel = require("../models/album-model");
const TrackModel = require("../models/track-model");
const mongoose = require("mongoose");

async function createTrack(trackData) {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const isTrackExist = await TrackModel.findOne({
      name: trackData.name,
      albumReference: trackData.albumReference,
    }).session(session);

    if (isTrackExist) {
      throw new Error("Track already exists");
    }

    const track = await TrackModel.create([trackData], { session });

    if (trackData.albumReference) {
      const album = await AlbumModel.findById(trackData.albumReference).session(
        session
      );

      if (album) {
        album.tracksReferences.push(track._id);
        await album.save({ session });
      } else {
        throw new Error("Album not found");
      }
    }

    await session.commitTransaction();
    return track;
  } catch (e) {
    await session.abortTransaction();
    throw e;
  } finally {
    session.endSession();
  }
}

async function getTrackById(trackId) {
  const track = await TrackModel.findById(trackId).populate("albumReference");

  if (!track) {
    throw new Error("Track not found");
  }

  return track;
}

async function getAllTracks() {
  const tracks = await TrackModel.find();

  return tracks;
}

async function updateTrack(trackId, trackData) {
  const track = await TrackModel.findByIdAndUpdate(trackId, trackData, {
    new: true,
    runValidators: true,
  });

  if (!track) {
    throw new Error("Track not found");
  }

  return track;
}

async function deleteTrack(trackId) {
  const track = await TrackModel.findByIdAndDelete(trackId);

  if (!track) {
    throw new Error("Track not found");
  }

  if (track.albumReference) {
    const album = await AlbumModel.findById(track.albumReference);
    if (album) {
      album.tracksReferences.pull(track._id);
      await album.save();
    }
  }
}

module.exports = {
  createTrack,
  getTrackById,
  getAllTracks,
  updateTrack,
  deleteTrack,
};

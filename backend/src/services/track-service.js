const AlbumModel = require("../models/album-model");
const TrackModel = require("../models/track-model");
const mongoose = require("mongoose");
const { Types } = mongoose;

async function createTrack(trackData) {
  const isTrackExist = await TrackModel.findOne({
    name: trackData.name,
    albumReference: trackData.albumReference,
  });

  if (isTrackExist) {
    throw new Error("Track already exists");
  }

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const track = await TrackModel.create([trackData], { session });

    if (trackData.albumReference) {
      const album = await AlbumModel.findById(trackData.albumReference).session(
        session
      );

      if (album) {
        album.tracksReferences.push(track[0]._id);
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
  const existingTrack = await TrackModel.findById(trackId);
  if (!existingTrack) {
    throw new Error("Track not found");
  }

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const albumReference = Types.ObjectId.isValid(trackData.albumReference)
      ? trackData.albumReference
      : null;

    let updatedTrackData;
    if (!albumReference) {
      updatedTrackData = { ...trackData, albumReference: null };
    } else {
      updatedTrackData = { ...trackData };
    }

    const track = await TrackModel.findByIdAndUpdate(
      trackId,
      updatedTrackData,
      {
        new: true,
        runValidators: true,
        session: session,
      }
    );

    console.log(trackData);

    if (albumReference) {
      const newAlbum = await AlbumModel.findById(albumReference).session(
        session
      );
      if (!newAlbum) {
        throw new Error("New album not found");
      }

      if (
        existingTrack.albumReference &&
        existingTrack.albumReference.toString() !== albumReference
      ) {
        const oldAlbum = await AlbumModel.findById(
          existingTrack.albumReference
        ).session(session);
        if (oldAlbum) {
          oldAlbum.tracksReferences.pull(track._id);
          await oldAlbum.save({ session });
        }

        newAlbum.tracksReferences.push(track._id);
        await newAlbum.save({ session });

        track.albumReference = albumReference;
        await track.save({ session });
      } else if (!existingTrack.albumReference) {
        newAlbum.tracksReferences.push(track._id);
        await newAlbum.save({ session });

        track.albumReference = albumReference;
        await track.save({ session });
      }
    } else if (existingTrack.albumReference) {
      const oldAlbum = await AlbumModel.findById(
        existingTrack.albumReference
      ).session(session);

      if (oldAlbum) {
        oldAlbum.tracksReferences.pull(track._id);
        await oldAlbum.save({ session });
      }

      track.albumReference = null;
      await track.save({ session });
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

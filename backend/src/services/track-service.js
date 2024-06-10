const AlbumModel = require("../models/album-model");
const TrackModel = require("../models/track-model");
const ArtistModel = require("../models/artist-model");
const mongoose = require("mongoose");
const { Types } = mongoose;

async function createTrack(trackData) {
  if (trackData.albumReference && trackData.artistReference) {
    throw new Error(
      "Track can only have either albumReference or artistReference, not both"
    );
  }

  if (!trackData.albumReference && !trackData.artistReference) {
    throw new Error(
      "Track must have either an albumReference or an artistReference."
    );
  }

  const isTrackExist = await TrackModel.findOne({
    name: trackData.name,
    $or: [
      { albumReference: trackData.albumReference || null },
      { artistReference: trackData.artistReference || null },
    ],
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
    } else if (trackData.artistReference) {
      const artist = await ArtistModel.findById(
        trackData.artistReference
      ).session(session);

      if (artist) {
        artist.singleSongs.push(track[0]._id);
        await artist.save({ session });
      } else {
        throw new Error("Artist not found");
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
  const track = await TrackModel.findById(trackId)
    .populate("albumReference")
    .select("-audio");

  if (!track) {
    throw new Error("Track not found");
  }

  return track;
}

async function getAllTracks() {
  const tracks = await TrackModel.find().select("-audio");

  return tracks;
}

async function updateTrack(trackId, trackData) {
  const existingTrack = await TrackModel.findById(trackId);
  if (!existingTrack) {
    throw new Error("Track not found");
  }

  const albumReference = Types.ObjectId.isValid(trackData.albumReference)
    ? trackData.albumReference
    : null;

  const artistReference = Types.ObjectId.isValid(trackData.artistReference)
    ? trackData.artistReference
    : null;

  if (!albumReference && !artistReference) {
    throw new Error(
      "Track must have either an albumReference or an artistReference."
    );
  }

  if (albumReference && artistReference) {
    throw new Error(
      "Track can only have either albumReference or artistReference, not both."
    );
  }

  if (
    (albumReference &&
      existingTrack.albumReference?.toString() === albumReference) ||
    (artistReference &&
      existingTrack.artistReference?.toString() === artistReference)
  ) {
    const updatedTrack = await TrackModel.findByIdAndUpdate(
      trackId,
      trackData,
      {
        new: true,
        runValidators: true,
      }
    );
    return updatedTrack;
  }

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const updatedTrackData = { ...trackData, albumReference, artistReference };

    const track = await TrackModel.findByIdAndUpdate(
      trackId,
      updatedTrackData,
      {
        new: true,
        runValidators: true,
        session: session,
      }
    );

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
      }

      newAlbum.tracksReferences.push(track._id);
      await newAlbum.save({ session });

      if (existingTrack.artistReference) {
        const oldArtist = await ArtistModel.findById(
          existingTrack.artistReference
        ).session(session);
        if (oldArtist) {
          oldArtist.singleSongs.pull(track._id);
          await oldArtist.save({ session });
        }
      }
    } else if (artistReference) {
      const newArtist = await ArtistModel.findById(artistReference).session(
        session
      );
      if (!newArtist) {
        throw new Error("New artist not found");
      }

      if (
        existingTrack.artistReference &&
        existingTrack.artistReference.toString() !== artistReference
      ) {
        const oldArtist = await ArtistModel.findById(
          existingTrack.artistReference
        ).session(session);
        if (oldArtist) {
          oldArtist.singleSongs.pull(track._id);
          await oldArtist.save({ session });
        }
      }

      newArtist.singleSongs.push(track._id);
      await newArtist.save({ session });

      if (existingTrack.albumReference) {
        const oldAlbum = await AlbumModel.findById(
          existingTrack.albumReference
        ).session(session);
        if (oldAlbum) {
          oldAlbum.tracksReferences.pull(track._id);
          await oldAlbum.save({ session });
        }
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

async function deleteTrack(trackId) {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const track = await TrackModel.findByIdAndDelete(trackId, { session });

    if (!track) {
      throw new Error("Track not found");
    }

    if (track.albumReference) {
      const album = await AlbumModel.findById(track.albumReference).session(
        session
      );
      if (album) {
        album.tracksReferences.pull(track._id);
        await album.save({ session });
      }
    } else if (track.artistReference) {
      const artist = await ArtistModel.findById(track.artistReference).session(
        session
      );
      if (artist) {
        artist.singleSongs.pull(track._id);
        await artist.save({ session });
      }
    }

    await session.commitTransaction();
  } catch (e) {
    await session.abortTransaction();
    throw e;
  } finally {
    session.endSession();
  }
}

async function getTrackAudioById(trackId) {
  const track = await TrackModel.findById(trackId).select("audio");

  if (!track) {
    throw new Error("Track not found");
  }

  return track;
}

async function incrementTrackListens(trackId) {
  const track = await TrackModel.findByIdAndUpdate(
    trackId,
    { $inc: { totalListens: 1 } },
    { new: true, select: "totalListens" }
  );

  if (!track) {
    throw new Error("Track not found");
  }

  return track;
}

async function topSongs(limit) {
  const tracks = await TrackModel.find()
    .sort({ totalListens: -1 })
    .limit(limit);

  return tracks;
}

async function recentlyAdded(limit) {
  const tracks = await TrackModel.find().sort({ createdAt: -1 }).limit(limit);

  return tracks;
}

module.exports = {
  createTrack,
  getTrackById,
  getAllTracks,
  updateTrack,
  deleteTrack,
  getTrackAudioById,
  incrementTrackListens,
  topSongs,
  recentlyAdded,
};

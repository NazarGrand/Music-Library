const AlbumModel = require("../models/album-model");
const TrackModel = require("../models/track-model");
const ArtistModel = require("../models/artist-model");
const mongoose = require("mongoose");
const { Types } = mongoose;

async function createAlbum(albumData) {
  const isAlbumExist = await AlbumModel.findOne({
    name: albumData.name,
    releaseDate: albumData.releaseDate,
  });

  if (isAlbumExist) {
    throw new Error("Album already exists");
  }

  const today = new Date();
  if (albumData.releaseDate > today) {
    throw new Error("Release date cannot be in the future");
  }

  if (!albumData.artistReference) {
    return await AlbumModel.create(albumData);
  }

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const album = await AlbumModel.create([albumData], { session });

    if (albumData.artistReference) {
      const artist = await ArtistModel.findById(
        albumData.artistReference
      ).session(session);

      if (!artist) {
        throw new Error("Artist not found");
      }

      artist.albums.push(album[0]._id);
      await artist.save({ session });
    }

    await session.commitTransaction();
    return album[0];
  } catch (e) {
    await session.abortTransaction();
    throw e;
  } finally {
    session.endSession();
  }
}

async function getAlbumById(albumId) {
  const album = await AlbumModel.findById(albumId).populate("tracksReferences");

  if (!album) {
    throw new Error("Album not found");
  }

  return album;
}

async function getAllAlbums() {
  const albums = await AlbumModel.find();

  return albums;
}

async function updateAlbum(albumId, albumData) {
  const existingAlbum = await AlbumModel.findById(albumId);
  if (!existingAlbum) {
    throw new Error("Album not found");
  }

  const artistReference = Types.ObjectId.isValid(albumData.artistReference)
    ? albumData.artistReference
    : null;

  if (
    (artistReference &&
      existingAlbum.artistReference &&
      existingAlbum.artistReference.toString() === artistReference) ||
    (!artistReference && !existingAlbum.artistReference)
  ) {
    const updatedAlbum = await AlbumModel.findByIdAndUpdate(
      albumId,
      albumData,
      {
        new: true,
        runValidators: true,
      }
    );
    return updatedAlbum;
  }

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const updatedAlbumData = { ...albumData, artistReference };

    const album = await AlbumModel.findByIdAndUpdate(
      albumId,
      updatedAlbumData,
      {
        new: true,
        runValidators: true,
        session: session,
      }
    );

    if (artistReference) {
      const newArtist = await ArtistModel.findById(artistReference).session(
        session
      );
      if (!newArtist) {
        throw new Error("New artist not found");
      }

      if (
        existingAlbum.artistReference &&
        existingAlbum.artistReference.toString() !== artistReference
      ) {
        const oldArtist = await ArtistModel.findById(
          existingAlbum.artistReference
        ).session(session);
        if (oldArtist) {
          oldArtist.albums.pull(album._id);
          await oldArtist.save({ session });
        }

        newArtist.albums.push(album._id);
        await newArtist.save({ session });
      } else if (!existingAlbum.artistReference) {
        newArtist.albums.push(album._id);
        await newArtist.save({ session });
      }
    } else if (existingAlbum.artistReference) {
      const oldArtist = await ArtistModel.findById(
        existingAlbum.artistReference
      ).session(session);

      if (oldArtist) {
        oldArtist.albums.pull(album._id);
        await oldArtist.save({ session });
      }
    }

    await session.commitTransaction();
    return album;
  } catch (e) {
    await session.abortTransaction();
    throw e;
  } finally {
    session.endSession();
  }
}

async function deleteAlbum(albumId) {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const album = await AlbumModel.findById(albumId).session(session);
    if (!album) {
      throw new Error("Album not found");
    }

    await TrackModel.deleteMany({ albumReference: albumId }).session(session);

    if (album.artistReference) {
      const artist = await ArtistModel.findById(album.artistReference).session(
        session
      );
      if (artist) {
        artist.albums.pull(albumId);
        await artist.save({ session });
      }
    }

    await AlbumModel.deleteOne({ _id: albumId }).session(session);

    await session.commitTransaction();
  } catch (e) {
    await session.abortTransaction();
    throw e;
  } finally {
    session.endSession();
  }
}

module.exports = {
  createAlbum,
  getAlbumById,
  getAllAlbums,
  updateAlbum,
  deleteAlbum,
};

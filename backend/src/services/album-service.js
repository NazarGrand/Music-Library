const AlbumModel = require("../models/album-model");
const TrackModel = require("../models/track-model");
const mongoose = require("mongoose");

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

  return await AlbumModel.create(albumData);
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
  const album = await AlbumModel.findByIdAndUpdate(albumId, albumData, {
    new: true,
    runValidators: true,
  });

  if (!album) {
    throw new Error("Album not found");
  }

  return album;
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

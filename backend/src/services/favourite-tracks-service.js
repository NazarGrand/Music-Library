const UserModel = require("../models/user-model");

async function getAllFavouriteTracks(userId) {
  const user = await UserModel.findById(userId).populate({
    path: "favouriteTracks",
    select: "-audio",
  });

  if (!user) {
    throw new Error("User not found");
  }

  const favouriteTracks = user.favouriteTracks;

  return favouriteTracks;
}

async function getFavouriteTrackIds(userId) {
  const user = await UserModel.findById(userId);

  if (!user) {
    throw new Error("User not found");
  }

  const favouriteTracks = user.favouriteTracks;

  return favouriteTracks;
}

async function addTrackToFavourites(userId, trackId) {
  const user = await UserModel.findById(userId);

  if (!user) {
    throw new Error("User not found");
  }

  if (user.favouriteTracks.includes(trackId)) {
    throw new Error("Track is already in favourites");
  }

  user.favouriteTracks.push(trackId);
  await user.save();

  return user;
}

async function removeTrackFromFavourites(userId, trackId) {
  const user = await UserModel.findById(userId);

  if (!user) {
    throw new Error("User not found");
  }

  user.favouriteTracks = user.favouriteTracks.filter(
    (favouriteTrackId) => favouriteTrackId.toString() !== trackId.toString()
  );
  await user.save();

  return user;
}

module.exports = {
  getAllFavouriteTracks,
  getFavouriteTrackIds,
  addTrackToFavourites,
  removeTrackFromFavourites,
};

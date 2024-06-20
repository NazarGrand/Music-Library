const UserModel = require("../models/user-model");

async function getAllFavouriteTracks(userId) {
  const user = await UserModel.findById(userId).populate({
    path: "favouriteTracks",
    select: "-audio",
    populate: {
      path: "artistReference",
      select: "name _id",
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  return user.favouriteTracks;
}

async function getFavouriteTrackIds(userId) {
  const user = await UserModel.findById(userId);

  if (!user) {
    throw new Error("User not found");
  }

  return user.favouriteTracks;
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

  return user.favouriteTracks;
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

  return user.favouriteTracks;
}

module.exports = {
  getAllFavouriteTracks,
  getFavouriteTrackIds,
  addTrackToFavourites,
  removeTrackFromFavourites,
};

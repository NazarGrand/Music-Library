const TrackModel = require("../models/track-model");
const mongoose = require("mongoose");

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

module.exports = {
  getTrackAudioById,
  incrementTrackListens,
};

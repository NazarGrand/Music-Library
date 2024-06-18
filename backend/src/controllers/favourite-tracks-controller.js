const favouriteTracksService = require("../services/favourite-tracks-service");

class FavouriteTracksController {
  async getAllFavouriteTracks(req, res) {
    const userId = req.body.user._id;

    try {
      const favouriteTracks =
        await favouriteTracksService.getAllFavouriteTracks(userId);

      return res.json(favouriteTracks);
    } catch (error) {
      console.error("Error in getAllFavouriteTracks controller:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  async addTrackToFavourites(req, res) {
    try {
      const userId = req.body.user._id;
      const trackId = req.params.trackId;

      const user = await favouriteTracksService.addTrackToFavourites(
        userId,
        trackId
      );

      return res.json(user);
    } catch (e) {
      console.error(e);
      return res.status(400).json({ message: e.message });
    }
  }

  async removeTrackFromFavourites(req, res) {
    try {
      const userId = req.body.user._id;
      const trackId = req.params.trackId;

      const user = await favouriteTracksService.removeTrackFromFavourites(
        userId,
        trackId
      );

      return res.json(user);
    } catch (e) {
      console.error(e);
      return res.status(400).json({ message: e.message });
    }
  }
}

module.exports = new FavouriteTracksController();

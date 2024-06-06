const trackService = require("../services/track-service");

class TrackController {
  async createTrack(req, res) {
    try {
      const createdTask = await trackService.createTrack(req.body);

      return res.json(createdTask);
    } catch (e) {
      console.log(e);
      return res.status(400).json({ message: e.message });
    }
  }

  async getTrack(req, res) {
    try {
      const track = await trackService.getTrackById(req.params.id);

      return res.json(track);
    } catch (e) {
      console.log(e);
      return res.status(400).json({ message: e.message });
    }
  }

  async getAllTracks(req, res) {
    try {
      const tracks = await trackService.getAllTracks();

      return res.json(tracks);
    } catch (e) {
      console.log(e);
      return res.status(400).json({ message: e.message });
    }
  }

  async updateTrack(req, res) {
    try {
      const updatedTrack = await trackService.updateTrack(
        req.params.id,
        req.body
      );

      return res.json(updatedTrack);
    } catch (e) {
      console.log(e);
      return res.status(400).json({ message: e.message });
    }
  }

  async deleteTrack(req, res) {
    try {
      await trackService.deleteTrack(req.params.id);

      return res.status(200).json("Track deleted successfully");
    } catch (e) {
      console.log(e);
      return res.status(400).json({ message: e.message });
    }
  }
}

module.exports = new TrackController();

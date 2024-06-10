const listenMusicService = require("../services/listen-music-service");

class ListenMusicController {
  async getTrackAudio(req, res) {
    try {
      const track = await listenMusicService.getTrackAudioById(req.params.id);
      return res.json(track);
    } catch (e) {
      console.log(e);
      return res.status(400).json({ message: e.message });
    }
  }

  async incrementTrackListens(req, res) {
    try {
      const track = await listenMusicService.incrementTrackListens(
        req.params.id
      );

      return res.json(track);
    } catch (e) {
      console.log(e);
      return res.status(400).json({ message: e.message });
    }
  }
}

module.exports = new ListenMusicController();

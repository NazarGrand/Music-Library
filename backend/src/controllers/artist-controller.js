const artistService = require("../services/artist-service");

class ArtistController {
  async createArtist(req, res) {
    try {
      const createdArtist = await artistService.createArtist(req.body);

      return res.json(createdArtist);
    } catch (e) {
      console.log(e);
      return res.status(400).json({ message: e.message });
    }
  }

  async getArtist(req, res) {
    try {
      const artist = await artistService.getArtistById(req.params.id);

      return res.json(artist);
    } catch (e) {
      console.log(e);
      return res.status(401).json({ message: e.message });
    }
  }

  async getAllArtists(req, res) {
    try {
      const artists = await artistService.getAllArtists();

      return res.json(artists);
    } catch (e) {
      console.log(e);
      return res.status(401).json({ message: e.message });
    }
  }

  async updateArtist(req, res) {
    try {
      const updatedArtist = await artistService.updateArtist(
        req.params.id,
        req.body
      );

      return res.json(updatedArtist);
    } catch (e) {
      console.log(e);
      return res.status(401).json({ message: e.message });
    }
  }

  async deleteArtist(req, res) {
    try {
      await artistService.deleteArtist(req.params.id);

      return res.status(200).json("Artist deleted successfully");
    } catch (e) {
      console.log(e);
      return res.status(401).json({ message: e.message });
    }
  }
}

module.exports = new ArtistController();

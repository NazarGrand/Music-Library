const albumService = require("../services/album-service");

class AlbumController {
  async createAlbum(req, res) {
    try {
      const albumData = req.body;
      const createdAlbum = await albumService.createAlbum(albumData);

      return res.json(createdAlbum);
    } catch (e) {
      console.log(e);
      return res.status(400).json({ message: e.message });
    }
  }

  async getAlbum(req, res) {
    try {
      const album = await albumService.getAlbumById(req.params.id);

      return res.json(album);
    } catch (e) {
      console.log(e);
      return res.status(401).json({ message: e.message });
    }
  }

  async getAllAlbums(req, res) {
    try {
      const albums = await albumService.getAllAlbums();

      return res.json(albums);
    } catch (e) {
      console.log(e);
      return res.status(401).json({ message: e.message });
    }
  }

  async updateAlbum(req, res) {
    try {
      const updatedAlbum = await albumService.updateAlbum(
        req.params.id,
        req.body
      );

      return res.json(updatedAlbum);
    } catch (e) {
      console.log(e);
      return res.status(401).json({ message: e.message });
    }
  }

  async deleteAlbum(req, res) {
    try {
      const deletedAlbum = await albumService.deleteAlbum(req.params.id);

      return res.json(deletedAlbum);
    } catch (e) {
      console.log(e);
      return res.status(401).json({ message: e.message });
    }
  }
}

module.exports = new AlbumController();

const userService = require("../services/user-service");

class UserController {
  async registration(req, res) {
    try {
      const { email, password } = req.body;
      const userData = await userService.registration(email, password);

      return res.json(userData);
    } catch (e) {
      console.log(e);
      return res.status(404).json({ message: e.message });
    }
  }

  async login(req, res) {
    try {
    } catch (e) {}
  }

  async logout(req, res) {
    try {
    } catch (e) {}
  }

  async activate(req, res) {
    try {
      const token = req.query.token;
      await userService.activate(token);

      return res.send("Activation was successful");
    } catch (e) {
      return res.status(404).json({ message: e.message });
    }
  }

  async getUsers(req, res) {
    try {
    } catch (e) {}
  }
}

module.exports = new UserController();

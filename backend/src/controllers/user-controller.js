const userService = require("../services/user-service");

class UserController {
  async registration(req, res) {
    try {
      const { email, password } = req.body;
      const userData = await userService.registration(email, password);

      return res.json(userData);
    } catch (e) {
      console.log(e);
      return res.status(400).json({ message: e.message });
    }
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;
      const userLogin = await userService.login(email, password);

      return res.json(userLogin);
    } catch (e) {
      console.log(e);
      return res.status(401).json({ message: e.message });
    }
  }

  // async logout(req, res) {
  //   try {
  //   } catch (e) {}
  // }

  async activate(req, res) {
    try {
      const token = req.query.token;
      await userService.activate(token);

      return res.send("Activation was successful");
    } catch (e) {
      return res.status(401).json({ message: e.message });
    }
  }

  async getUsers(req, res) {
    try {
      return res.send("Hello");
    } catch (e) {
      console.log(e.message);
      return res.status(500).json({ message: e.message });
    }
  }
}

module.exports = new UserController();

const userService = require("../services/user-service");

class UserController {
  async registration(req, res) {
    try {
      const { userName, email, password } = req.body;
      const userData = await userService.registration(
        userName,
        email,
        password
      );

      return res.json(userData);
    } catch (e) {
      console.log(e);
      return res.status(400).json({ message: e.message });
    }
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;
      const userData = await userService.login(email, password);

      return res.json(userData);
    } catch (e) {
      console.log(e);
      return res.status(401).json({ message: e.message });
    }
  }

  // async logout(req, res) {
  //   try {
  //   } catch (e) {}
  // }

  async verifyUser(req, res) {
    try {
      const { token } = req.body;
      await userService.verifyUser(token);

      return res.send("Activation was successful");
    } catch (e) {
      return res.status(401).json({ message: e.message });
    }
  }

  async me(req, res) {
    try {
      const { _id } = req.body.user;
      const userData = await userService.me(_id);

      return res.json(userData);
    } catch (e) {
      return res.status(401).json({ message: e.message });
    }
  }
}

module.exports = new UserController();

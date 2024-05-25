const Router = require("express").Router;
const userController = require("../controllers/user-controller");
const authMe = require("../middleware/authMe");
const rbacMiddleware = require("../middleware/rbacMiddleware");

const router = new Router();

router.post("/registration", userController.registration);
router.post("/login", userController.login);
router.post("/verify-user", userController.verifyUser);

router.use(authMe);

// router.get(
//   "/me",
//   rbacMiddleware.checkPermission("delete_album"),
//   userController.me
// );

module.exports = router;

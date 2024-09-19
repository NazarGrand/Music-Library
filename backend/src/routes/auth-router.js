const Router = require("express").Router;
const userController = require("../controllers/user-controller");
const authMe = require("../middleware/authMe");
const rbacMiddleware = require("../middleware/rbac/rbacMiddleware");

const router = new Router();

router.post("/registration", userController.registration);
router.post("/login", userController.login);
router.post("/verify-user", userController.verifyUser);
router.post("/refresh", userController.refresh);

router.get("/me", authMe, userController.me);
router.post("/logout", authMe, userController.logout);

module.exports = router;

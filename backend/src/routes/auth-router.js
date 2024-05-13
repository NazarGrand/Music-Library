const Router = require("express").Router;
const userController = require("../controllers/user-controller");
const authMe = require("../middleware/authMe");
const router = new Router();

router.post("/registration", userController.registration);
router.post("/login", userController.login);
router.post("/verify-user", userController.verifyUser);

router.use(authMe);
router.get("/me", authMe, userController.me);

module.exports = router;

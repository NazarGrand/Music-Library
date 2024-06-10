const Router = require("express").Router;
const { adminRoles, userRoles } = require("../constants/rolesConstants");
const ListenMusicController = require("../controllers/listen-music-controller");
const rbacMiddleware = require("../middleware/rbac/rbacMiddleware");

const router = new Router();

router.get(
  "/:id",
  rbacMiddleware.checkPermission([
    adminRoles.READ_RECORD,
    userRoles.READ_RECORD,
  ]),
  ListenMusicController.getTrackAudio
);

router.post(
  "/:id",
  rbacMiddleware.checkPermission([
    adminRoles.UPDATE_RECORD,
    userRoles.READ_RECORD,
  ]),
  ListenMusicController.incrementTrackListens
);

module.exports = router;

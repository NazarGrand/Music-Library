const Router = require("express").Router;
const { adminRoles, userRoles } = require("../constants/rolesConstants");
const trackController = require("../controllers/track-controller");
const rbacMiddleware = require("../middleware/rbac/rbacMiddleware");

const router = new Router();

router.post(
  "/",
  rbacMiddleware.checkPermission([adminRoles.CREATE_RECORD]),
  trackController.createTrack
);

router.get(
  "/",
  rbacMiddleware.checkPermission([
    adminRoles.READ_RECORD,
    userRoles.READ_RECORD,
  ]),
  trackController.getAllTracks
);

router.get(
  "/:id",
  rbacMiddleware.checkPermission([
    adminRoles.READ_RECORD,
    userRoles.READ_RECORD,
  ]),
  trackController.getTrack
);

router.put(
  "/:id",
  rbacMiddleware.checkPermission([adminRoles.UPDATE_RECORD]),
  trackController.updateTrack
);

router.delete(
  "/:id",
  rbacMiddleware.checkPermission([adminRoles.DELETE_RECORD]),
  trackController.deleteTrack
);

router.get(
  "/listen-music/:id",
  rbacMiddleware.checkPermission([
    adminRoles.READ_RECORD,
    userRoles.READ_RECORD,
  ]),
  trackController.getTrackAudio
);

router.post(
  "/listen-music/:id",
  rbacMiddleware.checkPermission([userRoles.INCREMENT_LISTENES]),
  trackController.incrementTrackListens
);

router.get(
  "/top-chart/:limit",
  rbacMiddleware.checkPermission([
    adminRoles.READ_RECORD,
    userRoles.READ_RECORD,
  ]),
  trackController.getTopSongs
);

router.get(
  "/recently-added/:limit",
  rbacMiddleware.checkPermission([
    adminRoles.READ_RECORD,
    userRoles.READ_RECORD,
  ]),
  trackController.recentlyAdded
);

module.exports = router;

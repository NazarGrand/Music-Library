const { adminRoles, userRoles } = require("../constants/rolesConstants");
const favouriteTracksController = require("../controllers/favourite-tracks-controller");

const Router = require("express").Router;
const rbacMiddleware = require("../middleware/rbac/rbacMiddleware");

const router = new Router();

router.get(
  "/",
  rbacMiddleware.checkPermission([
    adminRoles.READ_RECORD,
    userRoles.READ_RECORD,
  ]),
  favouriteTracksController.getAllFavouriteTracks
);

router.post(
  "/:trackId",
  rbacMiddleware.checkPermission([
    adminRoles.READ_RECORD,
    userRoles.READ_RECORD,
  ]),
  favouriteTracksController.addTrackToFavourites
);

router.delete(
  "/:trackId",
  rbacMiddleware.checkPermission([
    adminRoles.READ_RECORD,
    userRoles.READ_RECORD,
  ]),
  favouriteTracksController.removeTrackFromFavourites
);

module.exports = router;

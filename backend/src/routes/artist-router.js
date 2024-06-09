const Router = require("express").Router;
const { adminRoles, userRoles } = require("../constants/rolesConstants");
const artistController = require("../controllers/artist-controller");
const rbacMiddleware = require("../middleware/rbac/rbacMiddleware");

const router = new Router();

router.post(
  "/",
  rbacMiddleware.checkPermission([adminRoles.CREATE_ARTIST]),
  artistController.createArtist
);

router.get(
  "/",
  rbacMiddleware.checkPermission([
    adminRoles.READ_ARTIST,
    userRoles.READ_ARTIST,
  ]),
  artistController.getAllArtists
);

router.get(
  "/:id",
  rbacMiddleware.checkPermission([
    adminRoles.READ_ARTIST,
    userRoles.READ_ARTIST,
  ]),
  artistController.getArtist
);

router.put(
  "/:id",
  rbacMiddleware.checkPermission([adminRoles.UPDATE_ARTIST]),
  artistController.updateArtist
);

router.delete(
  "/:id",
  rbacMiddleware.checkPermission([adminRoles.DELETE_ARTIST]),
  artistController.deleteArtist
);

module.exports = router;

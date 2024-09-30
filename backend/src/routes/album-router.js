const Router = require("express").Router;
const { adminRoles, userRoles } = require("../constants/rolesConstants");
const albumController = require("../controllers/album-controller");
const rbacMiddleware = require("../middleware/rbac/rbacMiddleware");

const router = new Router();

router.post(
  "/",
  rbacMiddleware.checkPermission([adminRoles.CREATE_ALBUM]),
  albumController.createAlbum
);

router.get(
  "/",
  rbacMiddleware.checkPermission([adminRoles.READ_ALBUM, userRoles.READ_ALBUM]),
  albumController.getAllAlbums
);

router.get(
  "/:id",
  rbacMiddleware.checkPermission([adminRoles.READ_ALBUM, userRoles.READ_ALBUM]),
  albumController.getAlbum
);

router.put(
  "/:id",
  rbacMiddleware.checkPermission([adminRoles.UPDATE_ALBUM]),
  albumController.updateAlbum
);

router.delete(
  "/:id",
  rbacMiddleware.checkPermission([adminRoles.DELETE_ALBUM]),
  albumController.deleteAlbum
);

module.exports = router;

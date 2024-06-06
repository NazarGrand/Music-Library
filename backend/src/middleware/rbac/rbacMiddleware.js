const Permissions = require("./permissions");
const { getUserById } = require("../../services/user-service");

exports.checkPermission = (permissions) => {
  return async (req, res, next) => {
    let user = null;

    try {
      user = await getUserById(req.body.user._id);
    } catch (e) {
      return res.status(401).json({ error: "Bad request" });
    }

    const userPermissions = new Permissions().getPermissionsByRoleName(
      user.role
    );

    const hasPermission = permissions.some((permission) =>
      userPermissions.includes(permission)
    );

    if (hasPermission) {
      return next();
    } else {
      return res.status(403).json({ error: "Access denied" });
    }
  };
};

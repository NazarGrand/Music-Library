const roles = require("../../config/roles");

class Permissions {
  constructor() {
    this.permissions = [];
  }

  getPermissionsByRoleName(roleName) {
    const role = roles.find((r) => r.name === roleName);
    return role ? role.permissions : [];
  }
}

module.exports = Permissions;

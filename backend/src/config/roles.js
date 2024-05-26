const { userRoles, adminRoles } = require("../constants/rolesConstants");

const roles = [
  {
    name: "admin",
    permissions: [
      adminRoles.CREATE_RECORD,
      adminRoles.READ_RECORD,
      adminRoles.UPDATE_RECORD,
      adminRoles.DELETE_RECORD,

      adminRoles.CREATE_ALBUM,
      adminRoles.READ_ALBUM,
      adminRoles.UPDATE_ALBUM,
      adminRoles.DELETE_ALBUM,

      adminRoles.CREATE_ARTIST,
      adminRoles.READ_ARTIST,
      adminRoles.UPDATE_ARTIST,
      adminRoles.DELETE_ARTIST,
    ],
  },
  {
    name: "user",
    permissions: [
      userRoles.READ_RECORD,
      userRoles.READ_ALBUM,
      userRoles.READ_ARTIST,
    ],
  },
];

module.exports = roles;

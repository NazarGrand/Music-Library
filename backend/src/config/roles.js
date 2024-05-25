const userRoles = require("./rolesConstants");

const roles = [
  {
    name: "admin",
    permissions: [
      "create_record",
      "read_record",
      "update_record",
      "delete_record",
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

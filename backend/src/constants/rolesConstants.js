const userRoles = {
  READ_RECORD: "read_record",
  READ_ALBUM: "read_album",
  READ_ARTIST: "read_artist",

  UPDATE_RECORD: "update_record",
  INCREMENT_LISTENES: "increment_listenes",
};

const adminRoles = {
  CREATE_RECORD: "create_record",
  READ_RECORD: "read_record",
  UPDATE_RECORD: "update_record",
  DELETE_RECORD: "delete_record",

  CREATE_ALBUM: "create_album",
  READ_ALBUM: "read_album",
  UPDATE_ALBUM: "update_album",
  DELETE_ALBUM: "delete_album",

  CREATE_ARTIST: "create_artist",
  READ_ARTIST: "read_artist",
  UPDATE_ARTIST: "update_artist",
  DELETE_ARTIST: "delete_artist",
};

module.exports = { userRoles, adminRoles };

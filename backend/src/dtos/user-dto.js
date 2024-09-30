module.exports = class UserDto {
  email;
  _id;
  status;

  constructor(model) {
    this.email = model.email;
    this._id = model._id;
    this.status = model.status;
  }
};

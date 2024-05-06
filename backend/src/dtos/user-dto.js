module.exports = class UserDto {
  email;
  id;
  status;

  constructor(model) {
    this.email = model.email;
    this.id = model._id;
    this.status = model.status;
  }
};

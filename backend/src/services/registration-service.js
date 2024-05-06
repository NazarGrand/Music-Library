function validateEmail(email) {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
}

function validatePassword(password) {
  const re = /^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{6,}$/;
  return re.test(password);
}

module.exports = { validateEmail, validatePassword };

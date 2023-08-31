const passwordPattern = /^\S+$/;

const passwordValidation = (res, password, fieldName) => {
  if (!password) {
    res.send({ error: "password required", errorField: fieldName });
    return true;
  } else if (!passwordPattern.test(password)) {
    res.send({ error: "password can't be empty", errorField: fieldName });
    return true;
  } else {
    return false;
  }
};

module.exports = passwordValidation;

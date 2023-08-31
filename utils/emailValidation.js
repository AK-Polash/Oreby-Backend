const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const emailValidation = (res, email, fieldName) => {
  if (!email) {
    res.send({ error: "email required", errorField: fieldName });
    return true;
  } else if (!emailPattern.test(email)) {
    res.send({ error: "valid email required", errorField: fieldName });
    return true;
  } else {
    return false;
  }
};

module.exports = emailValidation;

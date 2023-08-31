const namePattern = /^[a-zA-Z][a-zA-Z0-9\s]*$/;

const nameValidation = (res, name, fieldName) => {
  if (!name) {
    res.send({ error: `${fieldName} required`, errorField: fieldName });
    return true;
  } else if (!namePattern.test(name)) {
    res.send({ error: `valid ${fieldName} required`, errorField: fieldName });
    return true;
  } else {
    return false;
  }
};

module.exports = nameValidation;

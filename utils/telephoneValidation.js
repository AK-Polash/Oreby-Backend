const telephonePattern = /^\S+$/;

const telephoneValidation = (res, telephone) => {
  if (!telephone) {
    res.send({ error: "telephone number required", errorField: "telephone" });
    return true;
  } else if (!telephonePattern.test(telephone)) {
    res.send({ error: "field can't be empty", errorField: "telephone" });
    return true;
  } else if (telephone.length > 11 || telephone.length < 6) {
    res.send({ error: "enter valid number", errorField: "telephone" });
    return true;
  } else {
    return false;
  }
};

module.exports = telephoneValidation;

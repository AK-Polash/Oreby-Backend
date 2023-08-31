const bcrypt = require("bcrypt");
const User = require("../models/registrationModel");
const emailValidation = require("../utils/emailValidation");
const passwordValidation = require("../utils/passwordValidation");

const loginController = async (req, res) => {
  const { email, password } = req.body;

  if (emailValidation(res, email, "email")) {
    return;
  } else if (passwordValidation(res, password, "password")) {
    return;
  }

  const existUser = await User.find({ email });

  if (!existUser.length > 0) {
    return res.send({ error: "User not found", errorField: "email" });
  }

  const match = await bcrypt.compare(password, existUser[0].password);

  if (match) {
    return res.send({ message: "Login success" });
  } else {
    return res.send({ error: "Crediential error", errorField: "password" });
  }
};

module.exports = loginController;

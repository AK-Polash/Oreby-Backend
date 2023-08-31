const User = require("../models/registrationModel");

const allUsersController = async (req, res) => {
  try {
    const allUsers = await User.find({}).select({ password: 0 });
    return res.send(allUsers);
  } catch (error) {
    return res.send({ error: "Internal server errror" });
  }
};

module.exports = allUsersController;

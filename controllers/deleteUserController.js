const User = require("../models/registrationModel");

const deleteUserController = async (req, res) => {
  const { id } = req.params;

  try {
    if (!id) return res.send({ error: "Crediential error" });

    const findUserId = await User.find({ _id: id });

    if (!findUserId.length > 0) return res.send({ error: "User not found" });

    await User.deleteOne({ _id: id });
    return res.send({ message: "User deleted successfully" });
  } catch (error) {
    return res.send({ error: "Internal server error" });
  }
};

module.exports = deleteUserController;

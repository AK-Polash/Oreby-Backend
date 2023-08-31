const User = require("../models/registrationModel");
const jwt = require("jsonwebtoken");

const userVerificationController = async (req, res) => {
  const { token } = req.body;

  try {
    if (!token) return res.send({ error: "Cridential error" });

    const decodedToken = jwt.verify(token, "secret");
    const { email } = decodedToken;

    const user = await User.findOneAndUpdate(
      { email },
      { verified: true },
      { new: true }
    );

    if (!user) {
      return res.send({ error: "Occured an error while verifying the user" });
    }

    return res.send({ message: "Account verified successfully" });
  } catch (error) {
    return res.send({ error: "Internal server error" });
  }
};

module.exports = userVerificationController;

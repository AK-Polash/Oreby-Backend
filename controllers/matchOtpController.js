const User = require("../models/registrationModel");

const matchOtpController = async (req, res) => {
  const { otp, forgotPassword } = req.body;

  try {
    const existingUser = await User.find({ email: forgotPassword });

    if (!existingUser.length > 0) {
      return res.send({ error: "Untracked email", errorField: "otp" });
    }

    if (existingUser[0].forgotPasswordOTP !== otp) {
      return res.send({ error: "OTP does not match", errorField: "otp" });
    }

    await User.updateOne(
      { email: forgotPassword },
      { $unset: { forgotPasswordOTP: "" } }
    );
    return res.send({ message: "OTP matched successfully" });
  } catch (err) {
    return res.send({ error: "Internal server error", errorField: "otp" });
  }
};

module.exports = matchOtpController;

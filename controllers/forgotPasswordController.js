const User = require("../models/registrationModel");
const emailValidation = require("../utils/emailValidation");
const emailSend = require("../utils/emailSend");
const aleaRNGFactory = require("number-generator/lib/aleaRNGFactory");
const otpTemplate = require("../emailTemplate/otpTemplate");

const forgotPasswordController = async (req, res) => {
  try {
    const { forgotPassword } = req.body;
    if (emailValidation(res, forgotPassword, "forgotPassword")) return;

    const existingUser = await User.find({ email: forgotPassword });
    if (!existingUser.length > 0) {
      return res.send({
        error: "User not found",
        errorField: "forgotPassword",
      });
    }

    const { uInt32 } = aleaRNGFactory(Date.now());
    const randomOtp = uInt32().toString().substring(0, 4);

    await User.findOneAndUpdate(
      { email: forgotPassword },
      { $set: { forgotPasswordOTP: randomOtp } },
      { new: true }
    );

    emailSend(forgotPassword, "Forgot Password?", otpTemplate(randomOtp));

    return res.send({ message: "An OTP code sent to your email address" });
  } catch (error) {
    return res.send({
      error: "Internal server error",
      errorField: "forgotPassword",
    });
  }
};

module.exports = forgotPasswordController;

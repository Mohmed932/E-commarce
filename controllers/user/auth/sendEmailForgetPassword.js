import { User } from "../../../models/user.js";
import { VerifyAny } from "../../../models/verify.js";
import { SendEmail } from "../../../utils/email/emailActive.js";
import { randomToken } from "../../../utils/token/randomToken.js";

export const sendEmailForgetPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(404).json({ message: "المستخدم غير موجود" });
    }
    const token = await randomToken(32);
    const resetPassword = new VerifyAny({
      user_id: existingUser._id,
      user_token: token,
    });

    await resetPassword.save();

    // إنشاء رابط التفعيل
    const activeLink = `${process.env.DOMAIN}/api/v1/auth/account_id/${existingUser._id}/check_link/${token}`;

    // إرسال رابط التفعيل إلى البريد الإلكتروني
    const kind = "resetPassword";
    await SendEmail(email, activeLink, kind);

    return res.json({
      message: "تم إرسال رابط الي البريد الالكتروني لاعاده تفعيل كلمه المرور",
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "حدث خطأ داخلي في الخادم", error: error.message });
  }
};

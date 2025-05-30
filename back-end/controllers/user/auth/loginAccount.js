import { User } from "../../../models/user.js";
import { VerifyAny } from "../../../models/verify.js";
import { loginVaildator } from "../../../services/uservalidator.js";
import { comparePassword } from "../../../utils/password/comparePassword.js";
import { SendEmail } from "../../../utils/email/emailActive.js";
import { randomToken } from "../../../utils/token/randomToken.js";
import { createToken } from "../../../utils/token/token.js";

export const loginAccount = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }
  try {
    // التحقق من صحة البيانات المدخلة
    const { error } = loginVaildator.validate(req.body, { abortEarly: false });

    if (error) {
      const errorMessages = error.details.map((detail) => detail.message);
      return res.status(400).json({
        status: "error",
        message: errorMessages,
      });
    }

    // التحقق من وجود المستخدم بالبريد الإلكتروني
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "لم يتم إنشاء حساب بهذا البريد الإلكتروني بعد",
      });
    }

    // التحقق من أن الحساب مفعل
    if (!user.isActive) {
      // إنشاء رمز التحقق من الحساب
      const token = await randomToken(32);
      const activeUser = new VerifyAny({
        user_id: user._id, // تم تصحيح newUser إلى user
        user_token: token,
      });

      await activeUser.save();

      // إنشاء رابط التفعيل
      const activeLink = `${process.env.FRONT_DOMAIN}/auth/account_id/${user._id}/active_account/${token}`;

      // إرسال رابط التفعيل إلى البريد الإلكتروني
      const kind = "activeAccount";
      await SendEmail(email, activeLink, kind);

      return res.json({
        message: "تم إرسال رابط تفعيل الحساب إلى بريدك الإلكتروني",
      });
    }

    // مقارنة كلمة المرور المدخلة مع كلمة المرور المخزنة
    const isPasswordValid = await comparePassword(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "كلمة المرور غير صحيحة" });
    }

    // إنشاء التوكن للمستخدم
    const token = await createToken(user);

    // إرسال التوكن في الكوكيز
    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 10 * 24 * 60 * 60 * 1000, // 10 أيام
        httpOnly: true, // منع الوصول إلى الكوكيز من JavaScript
      })
      .json({ message: "تم تسجيل الدخول بنجاح", token });
  } catch (error) {
    console.error("Error during login:", error.message);
    return res.status(500).json({ message: "حدث خطأ أثناء تسجيل الدخول" });
  }
};

import { User } from "../../../models/user.js";
import { VerifyAny } from "../../../models/verify.js";
import { signUpVaildator } from "../../../services/uservalidator.js";
import { SendEmail } from "../../../utils/emailActive.js";
import { hashPassword } from "../../../utils/hasePassword.js";
import { randomToken } from "../../../utils/randomToken.js";

export const createAccount = async (req, res) => {
  const { name, username, email, password } = req.body;

  try {
    // التحقق من صحة البيانات المدخلة
    const { error } = signUpVaildator.validate(req.body, { abortEarly: false });

    if (error) {
      const errorMessages = error.details.map((detail) => detail.message);
      return res.status(400).json({
        status: "error",
        message: errorMessages,
      });
    }

    // التحقق من وجود مستخدم بنفس البريد الإلكتروني أو اسم المستخدم
    const existingUser = await User.findOne({ email });
    const existingUsername = await User.findOne({ username });

    if (existingUser) {
      return res
        .status(400)
        .json({ message: "البريد الإلكتروني مستخدم بالفعل" });
    }

    if (existingUsername) {
      return res.status(400).json({ message: "اسم المستخدم مستخدم بالفعل" });
    }

    // تجزئة كلمة المرور
    const passwordHashed = await hashPassword(password);

    // إنشاء المستخدم الجديد
    const newUser = new User({
      name,
      username,
      email,
      password: passwordHashed,
    });

    await newUser.save();

    // إنشاء رمز التحقق من الحساب
    const token = await randomToken(32);
    const activeUser = new VerifyAny({
      user_id: newUser._id,
      user_token: token,
    });

    await activeUser.save();

    // إنشاء رابط التفعيل
    const activeLink = `${process.env.DOMAIN}/account_id/${newUser._id}/active_account/${token}`;

    // إرسال رابط التفعيل إلى البريد الإلكتروني
    await SendEmail(email, activeLink);

    return res.status(201).json({
      message: "تم إرسال رابط تفعيل الحساب إلى بريدك الإلكتروني",
    });
  } catch (error) {
    console.error("Error during account creation:", error.message);
    return res.status(500).json({ message: "حدث خطأ أثناء إنشاء الحساب" });
  }
};

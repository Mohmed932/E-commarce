import { User } from "../../../models/user.js";
import { VerifyAny } from "../../../models/verify.js";
import { hashPassword } from "../../../utils/hasePassword.js";

export const resetPassword = async (req, res) => {
  const { password, conformPassword } = req.body;
  const { token, id } = req.params;
  try {
    if (!password || !conformPassword || !id || !token) {
      return res.status(400).json({ message: "الطلب غير صالح" });
    }
    const check = await VerifyAny.findOne({ user_id: id, user_token: token });
    if (!check) {
      return res
        .status(400)
        .json({ message: "رمز التحقق منتهي الصلاحيه أو غير صالح" });
    }
    if (password !== conformPassword) {
      return res.status(400).json({ message: "كلمة المرور غير متطابقة" });
    }
    const newPassword = await hashPassword(password);
    await User.findByIdAndUpdate(
      { _id: id },
      {
        password: newPassword,
      },
      { new: true }
    );
    await VerifyAny.findOneAndDelete({ user_id: id, user_token: token });
    return res.json({ message: "تم تحديث كلمه المرور" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "حدث خطأ داخلي في الخادم", error: error.message });
  }
};

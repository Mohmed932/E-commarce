import { User } from "../../../models/user.js";
import { VerifyAny } from "../../../models/verify.js";

export const activeAccount = async (req, res) => {
  const { token, id } = req.params;

  try {
    // التحقق من وجود البيانات المطلوبة
    if (!token || !id) {
      return res.status(400).json({ message: "الطلب غير صالح" });
    }

    // البحث عن سجل التحقق
    const verificationRecord = await VerifyAny.findOne({
      user_id: id,
      user_token: token,
    });

    if (!verificationRecord) {
      return res
        .status(400)
        .json({ message: "رمز التحقق منتهي الصلاحية أو غير صالح" });
    }

    // تحديث حالة الحساب إلى نشط
    const updatedUser = await User.findByIdAndUpdate(
      verificationRecord.user_id,
      { isActive: true },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "المستخدم غير موجود" });
    }

    // حذف سجل التحقق بعد التنشيط
    await VerifyAny.deleteOne({ user_id: id, user_token: token });

    return res.json({ message: "تم تفعيل حسابك بنجاح" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "حدث خطأ داخلي في الخادم", error: error.message });
  }
};

import { VerifyAny } from "../../../models/verify.js";

export const checkLinkForgetPassword = async (req, res) => {
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
    return res.json({ message: "يمكنك الان اعاده تععين كلمه المرور" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "حدث خطأ داخلي في الخادم", error: error.message });
  }
};

import mongoose from "mongoose";

// Middleware للتحقق من صحة معرف المستخدم
export const validateUserId = (req, res, next) => {
  const { id } = req.params;
  // التحقق من صلاحية معرف المستخدم
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "معرف المستخدم غير صالح", id });
  }

  // إذا كانت المعرف صالحًا، انتقل إلى الخطوة التالية
  next();
};

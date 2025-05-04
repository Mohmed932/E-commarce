import { User } from "../../models/user.js";
import { addressVaildator } from "../../services/addressVaildator.js";
import { deleteImage, uploadAvatat } from "../../utils/cloudinary.js";
import fs from "fs/promises";

export const createAvatar = async (req, res) => {
  const { email } = req.user;

  // التحقق من وجود الملف في الطلب أو وجود خطأ في الملف
  if (!req.file) {
    return res
      .status(400)
      .json({ message: "يرجى تحميل صورة شخصية أو هناك خطأ في الملف." });
  }
  try {
    // محاولة إيجاد المستخدم وتحديث الصورة
    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return res.status(404).json({ message: "المستخدم غير موجود." });
    }

    // التحقق من وجود الصورة القديمة وحذفها
    if (existingUser.avatar && existingUser.avatar.idOfImage) {
      await deleteImage(existingUser.avatar.idOfImage);
    }

    // رفع الصورة الجديدة
    const { public_id, secure_url } = await uploadAvatat(req.file.path);
    existingUser.avatar = {
      img: secure_url,
      idOfImage: public_id,
    };
    await existingUser.save();
    return res.json({
      message: "تم تحديث الصورة الشخصية بنجاح.",
      avatar: existingUser.avatar,
    });
  } catch (error) {
    return res.status(500).json({
      message: "حدث خطأ داخلي في الخادم. الرجاء المحاولة لاحقًا.",
      error: error.message,
    });
  } finally {
    await fs.unlink(req.file.path);
  }
};

export const addAddress = async (req, res) => {
  const { email } = req.user;
  const { governorate, center, landmark, primaryPhone, extraPhone, fullName } =
    req.body;

  const { error } = addressVaildator(req.body);
  if (error) {
    return res
      .status(400)
      .json({ message: error.details.map((detail) => detail.message) });
  }
  try {
    // البحث عن المستخدم باستخدام البريد الإلكتروني
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(404).json({ message: "المستخدم غير موجود." });
    }
    existingUser.adress.push({
      governorate,
      center,
      landmark,
      primaryPhone,
      extraPhone,
      fullName,
    });
    await existingUser.save();
    return res.json(existingUser);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

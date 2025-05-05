import { SubCategory } from "../../models/subCategory.js";
import { User } from "../../models/user.js";
import { categoryVaildator } from "../../services/categoryVaildator.js";
import { deleteImage, uploadAvatat } from "../../utils/upload/cloudinary.js";
import { unlink } from "fs/promises";

export const updatesubCategory = async (req, res) => {
  const { _id } = req.user;
  const { id } = req.params;
  const { name } = req.body;

  try {
    // التحقق من الفاليديشن
    const { error } = categoryVaildator.validate(req.body, {
      abortEarly: false,
    });
    if (error) {
      const errorMessages = error.details.map((detail) => detail.message);
      return res.status(400).json({
        status: "error",
        message: errorMessages,
      });
    }

    // التحقق من المستخدم
    const existingUser = await User.findById(_id);
    if (!existingUser) {
      return res.status(404).json({ message: "المستخدم غير موجود." });
    }

    // التحقق من القسم الفرعي
    const result = await SubCategory.findById(id);
    if (!result) {
      return res.status(404).json({ message: "القسم الفرعي غير موجود." });
    }

    // رفع الصورة إن وُجدت
    if (req.file) {
      const { public_id, secure_url } = await uploadAvatat(req.file.path);
      if (result.image?.idOfImage) {
        await deleteImage(result.image.idOfImage);
      }
      result.image = {
        idOfImage: public_id,
        img: secure_url,
      };
    }

    // تحديث البيانات
    result.name = name;

    await result.save();

    return res.json({ result, message: "تم تحديث القسم الفرعي بنجاح." });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  } finally {
    // حذف الصورة من السيرفر بعد الرفع
    if (req.file?.path) {
      await unlink(req.file.path);
    }
  }
};

import { SubCategory } from "../../models/subCategory.js";
import { User } from "../../models/user.js";
import { categoryVaildator } from "../../services/categoryVaildator.js";
import { uploadAvatat } from "../../utils/upload/cloudinary.js";
import { unlink } from "fs/promises";

export const createsubCategory = async (req, res) => {
  const { _id } = req.user;
  const { id } = req.params;
  const { name } = req.body;
  if (!req.file) {
    return res.status(400).json({ message: "يجب إضافة صور." });
  }
  try {
    // التحقق من صحة البيانات المدخلة
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
    const existingUser = await User.findById(_id);
    if (!existingUser) {
      return res.status(404).json({ message: "المستخدم غير موجود." });
    }
    if (existingUser.role === "user") {
      return res
        .status(403)
        .json({ message: "ليس لديك صلاحيه لأضافه هذا القسم." });
    }
    const { public_id, secure_url } = await uploadAvatat(req.file.path);
    const newSubCategory = new SubCategory({
      name,
      category: id,
      createdBy: _id,
      image: {
        img: secure_url,
        idOfImage: public_id,
      },
    });
    const result = await newSubCategory.save();
    return res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  } finally {
    if (req.file.path) {
      unlink(req.file.path);
    }
  }
};

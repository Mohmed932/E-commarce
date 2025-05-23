import { Category } from "../../models/category.js";
import { User } from "../../models/user.js";
import { categoryVaildator } from "../../services/categoryVaildator.js";

export const createCategory = async (req, res) => {
  const { _id } = req.user;
  const { name } = req.body;
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
    const newCategory = new Category({
      name,
      createdBy: _id,
    });
    const result = await newCategory.save();
    return res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

import { Category } from "../models/category.js";
import { User } from "../models/user.js";
import { categoryVaildator } from "../services/categoryVaildator.js";

export const collectCategory = async (req, res) => {
  try {
    const categories = await Category.find();
    return res.json(categories);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

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
export const deleteCategory = async (req, res) => {
  const { id } = req.params;
  const { _id } = req.user;
  try {
    const existingUser = await User.findById(_id);
    if (!existingUser) {
      return res.status(404).json({ message: "المستخدم غير موجود." });
    }
    if (existingUser.role === "user") {
      return res
        .status(403)
        .json({ message: "ليس لديك صلاحيه لحذف هذا القسم." });
    }
    const result = await Category.findByIdAndDelete(id);
    return res.json({ result, message: "Category deleted" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
export const updateCategory = async (req, res) => {
  const { _id } = req.user;
  const { id } = req.params;
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
        .json({ message: "ليس لديك صلاحيه لحذف هذا القسم." });
    }
    const result = await Category.findOneAndUpdate(
      { _id: id },
      {
        name,
        createdBy: _id,
      },
      { new: true }
    );
    return res.json({ result, message: "Category updated" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

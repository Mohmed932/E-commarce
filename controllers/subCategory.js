import { SubCategory } from "../models/subCategory.js";
import { User } from "../models/user.js";
import { categoryVaildator } from "../services/categoryVaildator.js";

export const collectsubCategory = async (req, res) => {
  const { id } = req.params;
  try {
    const categories = await SubCategory.find({ category: id });
    return res.json(categories);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const createsubCategory = async (req, res) => {
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
        .json({ message: "ليس لديك صلاحيه لأضافه هذا القسم." });
    }
    const newSubCategory = new SubCategory({
      name,
      category: id,
      createdBy: _id,
    });
    const result = await newSubCategory.save();
    return res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
export const deletesubCategory = async (req, res) => {
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
    const result = await SubCategory.findByIdAndDelete(id);
    return res.json({ result, message: "subCategory deleted" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
export const updatesubCategory = async (req, res) => {
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
    const result = await SubCategory.findOneAndUpdate(
      { _id: id },
      {
        name,
        createdBy: _id,
      },
      { new: true }
    );
    return res.json({ result, message: "subCategory updated" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

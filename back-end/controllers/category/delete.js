import { Category } from "../../models/category.js";
import { User } from "../../models/user.js";

export const deleteCategory = async (req, res) => {
  const { id } = req.params;
  const { _id } = req.user;
  try {
    const existingUser = await User.findById(_id);
    if (!existingUser) {
      return res.status(404).json({ message: "المستخدم غير موجود." });
    }
    const result = await Category.findByIdAndDelete(id);
    return res.json({ result, message: "Category deleted" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

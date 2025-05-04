import { SubCategory } from "../../models/subCategory.js";
import { User } from "../../models/user.js";
import { deleteImage } from "../../utils/upload/cloudinary.js";

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
    await deleteImage(result.image.idOfImage);
    return res.json({ result, message: "subCategory deleted" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

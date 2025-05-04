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

    const result = await SubCategory.findById(id);
    if (!result) {
      return res.status(404).json({ message: "القسم الفرعي غير موجود." });
    }

    if (req.file) {
      const { public_id, secure_url } = await uploadAvatat(req.file.path);
      if (!result.image?.idOfImage) {
        result.image.idOfImage = public_id;
        result.image.img = secure_url;
      } else {
        await deleteImage(result.image.idOfImage);
        result.image.idOfImage = public_id;
        result.image.img = secure_url;
      }
    }

    result.name = name;
    result.createdBy = _id;
    await result.save();
    return res.json({ result, message: "subCategory updated" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  } finally {
    if (req.file.path) {
      unlink(req.file.path);
    }
  }
};

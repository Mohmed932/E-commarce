import { Brand } from "../../models/brand.js";
import { uploadAvatat } from "../../utils/cloudinary.js";
import fs from "fs/promises";

export const createBrand = async (req, res) => {
  const { id } = req.params;
  const { _id } = req.user;

  // التحقق من وجود الملف في الطلب أو وجود خطأ في الملف
  if (!req.file) {
    return res
      .status(400)
      .json({ message: "يرجى تحميل صورة شخصية أو هناك خطأ في الملف." });
  }
  const { public_id, secure_url } = await uploadAvatat(req.file.path);
  try {
    const brand = new Brand({
      image: {
        img: secure_url,
        idOfImage: public_id,
      },
      category: id,
      createdBy: _id,
    });
    await brand.save();
    return res.status(201).json({
      status: "success",
      data: brand,
    });
  } catch (error) {
    return res.status(500).json({
      status: "fail",
      message: error.message,
    });
  } finally {
    await fs.unlink(req.file.path);
  }
};

import { Brand } from "../../models/brand.js";
import { uploadAvatat } from "../../utils/upload/cloudinary.js";
import { brandvaildatorSchema } from "../../services/brandvaildator.js";
import fs from "fs/promises";

export const createBrand = async (req, res) => {
  const { id } = req.params;
  const { _id } = req.user;
  const { name } = req.body;
  // التحقق من صحة البيانات المدخلة
  const { error } = brandvaildatorSchema.validate(req.body, {
    abortEarly: false,
  });

  if (error) {
    const errorMessages = error.details.map((detail) => detail.message);
    return res.status(400).json({
      status: "error",
      message: errorMessages,
    });
  }
  // التحقق من وجود الملف في الطلب أو وجود خطأ في الملف
  if (!req.file) {
    return res
      .status(400)
      .json({ message: "يرجى تحميل صورة شخصية أو هناك خطأ في الملف." });
  }
  const { public_id, secure_url } = await uploadAvatat(req.file.path);
  try {
    const brand = new Brand({
      name,
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

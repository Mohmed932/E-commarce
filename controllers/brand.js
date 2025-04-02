import { Brand } from "../models/brand.js";
import fs from "fs/promises";
import { deleteImage, uploadAvatat } from "../utils/cloudinary.js";

export const collectBrand = async (req, res) => {
  const { id } = req.params;
  try {
    const brand = await Brand.find({ category: id });
    if (!brand) {
      return res.status(404).json({
        status: "fail",
        message: "العلامة التجارية غير موجودة",
      });
    }
    res.status(200).json({
      status: "success",
      data: brand,
    });
  } catch (error) {
    return res.status(500).json({
      status: "fail",
      message: error.message,
    });
  }
};

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
    await fs.unlink(req.file.path);
    return res.status(201).json({
      status: "success",
      data: brand,
    });
  } catch (error) {
    return res.status(500).json({
      status: "fail",
      message: error.message,
    });
  }
};
export const deleteBrand = async (req, res) => {
  const { id } = req.params;
  try {
    const brand = await Brand.findOne({ _id: id });
    if (!brand) {
      return res.status(404).json({
        status: "fail",
        message: "العلامة التجارية غير موجودة",
      });
    }
    // حذف الصورة من Cloudinary
    const publicId = brand.image.idOfImage;
    await deleteImage(publicId);
    await Brand.findOneAndDelete({ _id: id });
    return res.status(201).json({
      status: "removed successfully",
      data: brand,
    });
  } catch (error) {
    return res.status(500).json({
      status: "fail",
      message: error.message,
    });
  }
};

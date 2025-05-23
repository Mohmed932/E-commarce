import { Brand } from "../../models/brand.js";
import { deleteImage } from "../../utils/upload/cloudinary.js";

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

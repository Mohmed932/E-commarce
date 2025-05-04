import { Product } from "../../models/product.js";
import { validateProduct } from "../../services/productValidator.js";
import { uploadMultipleImages } from "../../utils/upload/cloudinary.js";
import fs from "fs/promises";

export const createProduct = async (req, res) => {
  const data = JSON.parse(req.body.data);
  const {
    title,
    price,
    discount,
    sizes,
    brand,
    specifications,
    overview,
    quantity,
    colors,
    category,
  } = data;

  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ message: "يجب إضافة صور." });
  }
  const { error } = validateProduct(data, req.files);

  if (error) {
    return res
      .status(400)
      .json({ message: error.details.map((detail) => detail.message) });
  }

  try {
    const images = req.files.map((img) => {
      return { path: img.path, original_filename: img.originalname };
    });
    const uploadImages = await uploadMultipleImages(images);
    const imageLinks = uploadImages.map((img) => {
      return {
        img: img.secure_url,
        idOfImage: img.public_id,
        original_filename: img.original_filename,
      };
    });
    const images_color = [];
    for (let i = 0; i < colors.length; i++) {
      const filtered = imageLinks.filter(({ original_filename }) =>
        original_filename.includes(colors[i])
      );
      if (filtered.length === 0) {
        return res.status(400).json({
          message: `يجب رفع صور للون: ${colors[i]}`,
        });
      }

      images_color.push({
        color: colors[i],
        images: filtered,
      });
    }

    const saveProduct = new Product({
      title,
      price,
      discount,
      sizes,
      brand,
      specifications,
      overview,
      quantity,
      category,
      colors: images_color,
    });
    await saveProduct.save();
    return res.json({ message: saveProduct });
  } catch (error) {
    // حذف الصور في حال حدوث أي خطأ أثناء العملية

    return res.status(500).json({ message: error.message });
  } finally {
    for (const img of req.files) {
      try {
        await fs.unlink(img.path);
      } catch (err) {
        console.error("فشل حذف الصورة:", err);
      }
    }
  }
};

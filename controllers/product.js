import { Product } from "../models/product.js";
import { uploadMultipleImages } from "../utils/cloudinary.js";
import { validateProduct } from "../services/productValidator.js";
import { unlink } from "fs/promises";

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
      const items = {
        color: colors[i],
        images: filtered,
      };
      images_color.push(items);
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
      colors: images_color,
    });
    await saveProduct.save();
    return res.json({ message: saveProduct });
  } catch (error) {
    // حذف الصور في حال حدوث أي خطأ أثناء العملية
    for (const img of req.files) {
      await unlink(img.path, (err) => {
        if (err) console.error("Failed to delete:", err);
      });
    }
    return res.status(500).json({ message: error.message });
  } finally {
    // حذف الصور في كل الأحوال سواء حدث خطأ أم لا
    for (const img of req.files) {
      try {
        await unlink(img.path);
      } catch (err) {
        console.error("فشل في حذف الصورة:", err);
      }
    }
  }
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const check = await Product.findOne({ _id: id });
    if (!check) {
      return res.status(400).json({ message: "this product is not found" });
    }
  
    const images = check.colors.flatMap((color) => {
      return color.images.map((img) => img.idOfImage);
    });
    await deleteImages(publicIds);
    await check.deleteOne();
    return res.json({ images });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
  
};

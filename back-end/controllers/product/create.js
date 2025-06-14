import { Product } from "../../models/product.js";
import { validateProduct } from "../../services/productValidator.js";
import { uploadMultipleImages } from "../../utils/upload/cloudinary.js";
import fs from "fs/promises";

// دالة لتعقيم اسم الملف (إزالة الرموز غير المسموح بها)
const sanitizeFilename = (filename) =>
  filename.replace(/[^a-zA-Z0-9-_\.]/g, "_").toLowerCase();

// دالة لحذف الصور من السيرفر بعد التأكد من وجودها
const deleteUploadedFiles = async (files) => {
  for (const img of files || []) {
    if (img?.path) {
      try {
        await fs.access(img.path); // تأكد أن الملف موجود
        await fs.unlink(img.path); // ثم احذفه
      } catch (err) {
        console.error("فشل حذف الصورة أو غير موجودة:", err.message);
      }
    }
  }
};

export const createProduct = async (req, res) => {
  let data;

  try {
    if (!req.body.data) {
      await deleteUploadedFiles(req.files);
      return res.status(400).json({ message: "البيانات غير موجودة." });
    }

    data = JSON.parse(req.body.data);
  } catch (e) {
    await deleteUploadedFiles(req.files);
    return res.status(400).json({ message: "صيغة البيانات غير صحيحة." });
  }

  const {
    title,
    discount,
    brand,
    specifications,
    overview,
    colorsSizePrice,
    category,
    subCategory,
  } = data;

  if (!req.files || req.files.length === 0) {
    await deleteUploadedFiles(req.files);
    return res.status(400).json({ message: "يجب إضافة صور." });
  }

  const { error } = validateProduct(data);
  if (error) {
    await deleteUploadedFiles(req.files);
    return res
      .status(400)
      .json({ message: error.details.map((detail) => detail.message) });
  }

  try {
    // تعقيم أسماء الملفات
    const images = req.files.map((img) => ({
      path: img.path,
      original_filename: sanitizeFilename(img.originalname),
    }));

    // رفع الصور إلى Cloudinary
    const uploadImages = await uploadMultipleImages(images);
    if (!uploadImages || uploadImages.length === 0) {
      await deleteUploadedFiles(req.files);
      return res.status(500).json({ message: "فشل في رفع الصور." });
    }

    // تجهيز روابط الصور
    const imageLinks = uploadImages.map((img) => ({
      img: img.secure_url,
      idOfImage: img.public_id,
      original_filename: img.original_filename,
    }));

    // ربط الصور بالألوان
    const images_color = [];
    for (let i = 0; i < colorsSizePrice.length; i++) {
      const color = colorsSizePrice[i];

      if (!color.colorName || !color.sizesAndPrices) {
        await deleteUploadedFiles(req.files);
        return res.status(400).json({
          message: `اللون ${color.colorName} غير مكتمل البيانات.`,
        });
      }

      const filtered = imageLinks.filter(({ original_filename }) =>
        original_filename.includes(color.colorName.toLowerCase())
      );

      if (filtered.length === 0) {
        await deleteUploadedFiles(req.files);
        return res.status(400).json({
          message: `يجب رفع صور للون: ${color.colorName}`,
        });
      }

      images_color.push({
        colorName: color.colorName,
        sizesAndPrices: color.sizesAndPrices,
        images: filtered,
      });
    }

    // حفظ المنتج في قاعدة البيانات
    const saveProduct = new Product({
      title,
      discount,
      brand,
      specifications,
      overview,
      category,
      subCategory,
      colorsSizePrice: images_color,
    });

    await saveProduct.save();
    return res.json({ message: "تم حفظ المنتج بنجاح" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  } finally {
    await deleteUploadedFiles(req.files);
  }
};

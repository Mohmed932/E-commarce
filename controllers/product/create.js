import { Product } from "../../models/product.js";
import { validateProduct } from "../../services/productValidator.js";
import { uploadMultipleImages } from "../../utils/upload/cloudinary.js";
import fs from "fs/promises";

// دالة لحذف الصور من السيرفر
const deleteUploadedFiles = async (files) => {
  for (const img of files || []) {
    if (img?.path) {
      try {
        await fs.unlink(img.path);
      } catch (err) {
        console.error("فشل حذف الصورة:", err);
      }
    }
  }
};

export const createProduct = async (req, res) => {
  let data;

  // محاولة قراءة البيانات القادمة
  try {
    data = JSON.parse(req.body.data);
  } catch (e) {
    await deleteUploadedFiles(req.files);
    return res.status(400).json({ message: "صيغة البيانات غير صحيحة." });
  }

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

  // التأكد من وجود صور
  if (!req.files || req.files.length === 0) {
    await deleteUploadedFiles(req.files);
    return res.status(400).json({ message: "يجب إضافة صور." });
  }

  // التحقق من صحة البيانات
  const { error } = validateProduct(data);
  if (error) {
    await deleteUploadedFiles(req.files);
    return res
      .status(400)
      .json({ message: error.details.map((detail) => detail.message) });
  }

  try {
    // تجهيز الصور للرفع
    const images = req.files.map((img) => ({
      path: img.path,
      original_filename: img.originalname,
    }));

    // رفع الصور إلى Cloudinary
    const uploadImages = await uploadMultipleImages(images);

    // تجهيز روابط الصور
    const imageLinks = uploadImages.map((img) => ({
      img: img.secure_url,
      idOfImage: img.public_id,
      original_filename: img.original_filename,
    }));

    // ربط الصور بالألوان
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

    // حفظ المنتج في قاعدة البيانات
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
    return res.json({ message: "تم حفظ المنتج بنجاح" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  } finally {
    // حذف الصور المؤقتة في جميع الحالات
    await deleteUploadedFiles(req.files);
  }
};

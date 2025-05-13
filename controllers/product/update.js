import { Product } from "../../models/product.js";
import {
  addImagesValidateProduct,
  updateValidateProduct,
} from "../../services/productValidator.js";
import {
  deleteImages,
  uploadMultipleImages,
} from "../../utils/upload/cloudinary.js";
import fs from "fs/promises";


const updateColorsSizePrice = (checkProduct, colorsSizePrice, discount) => {
  checkProduct.colorsSizePrice.forEach((item) => {
    colorsSizePrice.forEach((it) => {
      // تأكد أن اللون يطابق
      if (item._id.toString() === it._id.toString()) {
        item.colorName = it.colorName;
        it.sizesAndPrices.forEach((updatedSize) => {
          const finalPrice =
            discount > 0
              ? updatedSize.price - (updatedSize.price * discount) / 100
              : updatedSize.price;

          const newSizeData = {
            ...updatedSize,
            finalPrice,
            available: updatedSize.quantity > 0,
          };

          if (updatedSize._id) {
            const index = item.sizesAndPrices.findIndex(
              (existingSize) =>
                existingSize._id &&
                existingSize._id.toString() === updatedSize._id.toString()
            );

            if (index !== -1) {
              item.sizesAndPrices[index] = newSizeData;
            } else {
              item.sizesAndPrices.push(newSizeData);
            }
          } else {
            // مقاس جديد مفيهوش _id → نضيفه
            item.sizesAndPrices.push(newSizeData);
          }
        });

      }
    });
  });
};




export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const {
    title,
    discount,
    brand,
    specifications,
    overview,
    category,
    colorsSizePrice
  } = req.body;

  const { error } = updateValidateProduct(req.body);
  if (error) {
    return res
      .status(400)
      .json({ message: error.details.map((detail) => detail.message) });
  }

  try {
    const checkProduct = await Product.findById(id);
    if (!checkProduct) {
      return res.status(404).json({ message: "This product is not found" });
    }

    // تحديث الحقول الرئيسية
    checkProduct.title = title;
    checkProduct.discount = discount;
    checkProduct.brand = brand;
    checkProduct.specifications = specifications;
    checkProduct.overview = overview;
    checkProduct.category = category;
    updateColorsSizePrice(checkProduct, colorsSizePrice, discount)
    await checkProduct.save();
    return res.json({ data: checkProduct });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


export const addImagesColorProduct = async (req, res) => {
  const { id } = req.params;
  const color = JSON.parse(req.body.color);
  // التحقق من وجود صور مرفقة في الطلب
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ message: "يجب إضافة صور." });
  }

  // التحقق من صحة المدخلات الخاصة بالألوان
  const { error } = addImagesValidateProduct(color);
  if (error) {
    return res.status(400).json({
      message: error.details.map((detail) => detail.message),
    });
  }
  let uploadedImages;
  try {
    //     // التحقق من وجود المنتج في قاعدة البيانات
    const checkProduct = await Product.findById(id);
    if (!checkProduct) {
      return res.status(404).json({ message: "هذا المنتج غير موجود." });
    }
    //     // تجهيز روابط الصور المحلية المرفوعة
    const images = req.files.map((img) => ({
      path: img.path,
      original_filename: img.originalname,
    }));

    //     // رفع الصور إلى خدمة التخزين (مثل Cloudinary)
    uploadedImages = await uploadMultipleImages(images);
    const imageLinks = uploadedImages.map((img) => ({
      img: img.secure_url,
      idOfImage: img.public_id,
      original_filename: img.original_filename,
    }));

    const filtered = imageLinks.filter(({ original_filename }) =>
      original_filename.includes(color)
    );
    if (filtered.length === 0) {
      return res.status(400).json({
        message: `يجب رفع صور للون: ${color}`,
      });
    }

    //       // إضافة الصور إلى المنتج
    const colorExist = checkProduct.colorsSizePrice.find(
      (item) => item.colorName === color
    );
    if (colorExist) {
      colorExist.images = colorExist.images.concat(filtered);
    } else {
      checkProduct.colorsSizePrice.push({
        colorName: color,
        images: filtered,
      });
    }

    //     // حفظ التحديثات في المنتج
    await checkProduct.save();
    return res.json({ data: checkProduct });

  } catch (error) {
    return res.status(500).json({ message: error.message });
  } finally {
    // حذف الصور المحلية المرفوعة بعد الانتهاء
    if (req.files && req.files.length > 0) {
      await Promise.all(
        req.files.map(async (img) => {
          try {
            await fs.unlink(img.path);
          } catch (err) {
            console.error("فشل حذف الصورة المحلية:", err);
          }
        })
      );
    }
  }
};


export const deleteImagesColorProduct = async (req, res) => {
  const { id } = req.params;
  const idOfImages = req.body;

  if (!Array.isArray(idOfImages) || idOfImages.length === 0) {
    return res.status(400).json({ message: "يجب اضافه معرف  الصور التي تريد حذفها" });
  }

  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "المنتج غير موجود" });
    }

    const idsToDelete = idOfImages.map((id) => id.toString());

    const updatedColors = product.colorsSizePrice
      .map((item) => {
        item.images = item.images.filter((img) =>
          typeof img === "string"
            ? !idsToDelete.includes(img)
            : !idsToDelete.includes(img._id.toString())
        );
        return item;
      })
      .filter(
        (item) => Array.isArray(item.images) && item.images.length > 0
      );

    const totalImagesRemaining = updatedColors.reduce(
      (acc, item) => acc + item.images.length,
      0
    );

    if (totalImagesRemaining === 0) {
      return res.status(400).json({ message: "لا يمكن ترك المنتج بدون صور" });
    }
    await product.save();
    await deleteImages(idsToDelete);

    return res.json({ message: "تم حذف الصور بنجاح", product });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "حدث خطأ أثناء حذف الصور" });
  }
};

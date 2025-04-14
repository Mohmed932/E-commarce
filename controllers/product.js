import { Product } from "../models/product.js";
import { deleteImages, uploadMultipleImages } from "../utils/cloudinary.js";
import {
  addImagesValidateProduct,
  updateValidateProduct,
  validateProduct,
} from "../services/productValidator.js";
import fs from "fs/promises";
import mongoose from "mongoose";

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
    await deleteImages(images);
    await check.deleteOne();
    return res.json({ images });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getSingleProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const check = await Product.findOne({ _id: id });
    if (!check) {
      return res.status(400).json({ message: "this product is not found" });
    }
    return res.json({ Product: check });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getProduct = async (req, res) => {
  const { category } = req.params;
  console.log(category, category);
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  try {
    if (!mongoose.Types.ObjectId.isValid(category)) {
      return res
        .status(400)
        .json({ message: "معرف المستخدم غير صالح", category });
    }
    const items = await Product.find({ category })
      .skip((page - 1) * limit)
      .limit(limit);

    const total = await Product.countDocuments();
    return res.json({
      totalItems: total,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      data: items,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const {
    title,
    price,
    discount,
    sizes,
    brand,
    specifications,
    overview,
    quantity,
    category,
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

    const finalPrice = discount > 0 ? price - (price * discount) / 100 : price;
    const available = quantity > 0;

    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      {
        title,
        price,
        discount,
        sizes,
        brand,
        specifications,
        overview,
        quantity,
        category,
        finalPrice,
        available,
      },
      { new: true }
    );

    return res.json({ data: updatedProduct });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const addImagesColorProduct = async (req, res) => {
  const { id } = req.params;
  const colors = JSON.parse(req.body.colors);

  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ message: "يجب إضافة صور." });
  }

  const { error } = addImagesValidateProduct(colors, req.files);
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

    for (let i = 0; i < colors.length; i++) {
      const filtered = imageLinks.filter(({ original_filename }) =>
        original_filename.includes(colors[i])
      );
      if (filtered.length === 0) {
        return res.status(400).json({
          message: `يجب رفع صور للون: ${colors[i]}`,
        });
      }

      const colorExist = checkProduct.colors.find(
        (item) => item.color === colors[i]
      );
      if (colorExist) {
        colorExist.images = colorExist.images.concat(filtered);
      } else {
        checkProduct.colors.push({
          color: colors[i],
          images: filtered,
        });
      }
    }

    await checkProduct.save();
    return res.json({ data: checkProduct });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  } finally {
    await Promise.all(
      req.files.map(async (img) => {
        try {
          await fs.unlink(img.path);
        } catch (err) {
          console.error("Failed to delete:", err);
        }
      })
    );
  }
};

export const deleteImagesColorProduct = async (req, res) => {
  const { id } = req.params;
  const idOfImages = req.body; // array of { idOfImage: "..." }

  if (idOfImages.length === 0) {
    return res.status(400).json({ message: "يجب اضافه الصور التي تريد حذفها" });
  }

  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "This product is not found" });
    }

    // استخراج قائمة بالـ id الخاص بالصور اللي عايزين نحذفها
    const idsToDelete = idOfImages.map((img) => img.idOfImage);

    // حذف الصور من كل لون
    product.colors = product.colors
      .map((color) => {
        color.images = color.images.filter(
          // هنا بيرجع كل الصور ما عدا اللي الid  بتاعها  موجود في ال array دا idsToDelete
          // او بتقلو جبلي كل الايدي اللي في اللي في الصور التي لا تحتوي علي الايدي اللي في  idsToDelete
          (image) => !idsToDelete.includes(image.idOfImage)
        );
        return color;
      })
      .filter((color) => color.images.length > 0); // نحذف الألوان اللي مفيهاش صور

    // حفظ التعديلات في قاعدة البيانات
    await product.save();
    await deleteImages(idsToDelete);

    return res.json({ message: "تم حذف الصور بنجاح", product });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

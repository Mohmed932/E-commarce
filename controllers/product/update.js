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

  const { error } = addImagesValidateProduct(colors);
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

    for (let i = 0; i < colors.colors.length; i++) {
      const filtered = imageLinks.filter(({ original_filename }) =>
        original_filename.includes(colors.colors[i])
      );
      if (filtered.length === 0) {
        return res.status(400).json({
          message: `يجب رفع صور للون: ${colors.colors[i]}`,
        });
      }

      const colorExist = checkProduct.colors.find(
        (item) => item.color === colors.colors[i]
      );
      if (colorExist) {
        colorExist.images = colorExist.images.concat(filtered);
      } else {
        checkProduct.colors.push({
          color: colors.colors[i],
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
  const idOfImages = req.body;

  if (!Array.isArray(idOfImages) || idOfImages.length === 0) {
    return res.status(400).json({ message: "يجب اضافه الصور التي تريد حذفها" });
  }

  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "المنتج غير موجود" });
    }

    const idsToDelete = idOfImages.map((id) => id.toString());

    const updatedColors = product.colors
      .map((color) => {
        color.images = color.images.filter((img) =>
          typeof img === "string"
            ? !idsToDelete.includes(img)
            : !idsToDelete.includes(img._id.toString())
        );
        return color;
      })
      .filter(
        (color) => Array.isArray(color.images) && color.images.length > 0
      );

    const totalImagesRemaining = updatedColors.reduce(
      (acc, color) => acc + color.images.length,
      0
    );

    if (totalImagesRemaining === 0) {
      return res.status(400).json({ message: "لا يمكن ترك المنتج بدون صور" });
    }

    product.colors = updatedColors;
    await product.save();
    await deleteImages(idsToDelete);

    return res.json({ message: "تم حذف الصور بنجاح", product });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "حدث خطأ أثناء حذف الصور" });
  }
};

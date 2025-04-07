import { Product } from "../models/product.js";
import { uploadMultipleImages } from "../utils/cloudinary.js";
import { validateProduct } from "../services/productValidator.js";

export const createProduct = async (req, res) => {
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
  } = JSON.parse(req.body.data);

  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ message: "يجب إضافة صور." });
  }
  const data = JSON.parse(req.body.data);
  // const { error } = validateProduct(data);

  // if (error) {
  //   // إذا كانت هناك أخطاء، قم بإرجاع الرسائل للمستخدم
  //   return res
  //     .status(400)
  //     .json({ message: error.details.map((detail) => detail.message) });
  // }
  try {
    const images = req.files.map((img) => {
      return { path: img.path };
    });
    const uploadImages = await uploadMultipleImages(images);
    const imageLinks = uploadImages.map((img) => {
      return {
        img: img.secure_url,
        idOfImage: img.public_id,
      };
    });
    const images_color = [];
    for (let i = 0; i < colors.length; i++) {
      const filtered = imageLinks.filter(({ img }) => img.includes(colors[i]));
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
    console.log(saveProduct)
    return res.json({ message: "saveProduct" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

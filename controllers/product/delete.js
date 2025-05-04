import { Product } from "../../models/product.js";
import { deleteImages } from "../../utils/cloudinary.js";

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

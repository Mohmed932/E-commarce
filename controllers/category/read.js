import { Category } from "../../models/category.js";

export const collectCategory = async (req, res) => {
  try {
    const categories = await Category.find();
    return res.json({ categories });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

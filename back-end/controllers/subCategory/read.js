import { SubCategory } from "../../models/subCategory.js";

export const collectsubCategory = async (req, res) => {
  const { id } = req.params;
  try {
    const categories = await SubCategory.find({ category: id });
    return res.json(categories);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

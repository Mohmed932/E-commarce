import mongoose from "mongoose";
import { Product } from "../../models/product.js";

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

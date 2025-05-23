import mongoose from "mongoose";
import { RateProduct } from "../../models/rateProduct.js";
import { Product } from "../../models/product.js";
import { addRateProductVaildator } from "../../services/RateProductVailldator.js/addRateProduct.js";

export const updateRateProduct = async (req, res) => {
  const { id, rate_id } = req.params;
  const { _id } = req.user;
  const { rate, comment } = req.body;

  if (!mongoose.Types.ObjectId.isValid(rate_id)) {
    return res.status(400).json({ message: "معرف التقييم غير صالح" });
  }
  const { error } = addRateProductVaildator.validate(req.body, {
    abortEarly: false,
  });

  if (error) {
    return res
      .status(400)
      .json({ message: error.details.map((detail) => detail.message) });
  }

  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(400).json({ message: "لم يتم العثور علي هذا المنتج" });
    }

    const globalRating = await RateProduct.findOne({ product_id: id });
    if (!globalRating) {
      return res
        .status(404)
        .json({ message: "لم يتم العثور على تقييم لهذا المنتج" });
    }

    const targetRating = globalRating.rating.find(
      (i) => i._id.toString() === rate_id && i.user_id.toString() === _id
    );
    if (!targetRating) {
      return res
        .status(403)
        .json({ message: "لا تملك صلاحية تعديل هذا التقييم" });
    }

    targetRating.rate = rate;
    if (comment) targetRating.comment = comment;

    // clac average rating
    const allRates = globalRating.rating.map((i) => i.rate);
    const total = allRates.reduce((sum, r) => sum + r, 0);
    const average = allRates.length ? +(total / allRates.length).toFixed(1) : 0;
    product.average_rate = average;
    await globalRating.save();
    await product.save();

    return res.json({ globalRating });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

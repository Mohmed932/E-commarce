import mongoose from "mongoose";
import { RateProduct } from "../../models/rateProduct.js";

export const updateRateProduct = async (req, res) => {
  const { id, rate_id } = req.params;
  const { _id } = req.user;
  const { rate, comment } = req.body;

  if (!mongoose.Types.ObjectId.isValid(rate_id)) {
    return res.status(400).json({ message: "معرف التقييم غير صالح" });
  }

  try {
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

    const allRates = globalRating.rating.map((i) => i.rate);
    const average =
      allRates.length > 0
        ? +(allRates.reduce((a, b) => a + b, 0) / allRates.length).toFixed(1)
        : 0;
    globalRating.average = average;

    await globalRating.save();
    return res.json({ globalRating });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

import mongoose from "mongoose";
import { RateProduct } from "../../models/rateProduct.js";
import { Product } from "../../models/product.js";

export const deleteRateProduct = async (req, res) => {
  const { id, rate_id } = req.params;
  const { _id } = req.user;

  if (!mongoose.Types.ObjectId.isValid(rate_id)) {
    return res.status(400).json({ message: "معرف التقييم غير صالح", id });
  }

  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(400).json({ message: "لم يتم العثور علي هذا المنتج" });
    }
    const globalRating = await RateProduct.findOne({ product_id: id });

    if (!globalRating) {
      return res
        .status(400)
        .json({ message: "لم يتم العثور على تقييم لهذا المنتج" });
    }

    const targetRating = globalRating.rating.find(
      (i) => i._id.toString() === rate_id && i.user_id.toString() === _id
    );

    if (!targetRating) {
      return res
        .status(400)
        .json({ message: "لم تقم بإضافة هذا التقييم أو لا تملك صلاحية حذفه" });
    }

    // احذف التقييم
    globalRating.rating = globalRating.rating.filter(
      (i) => i._id.toString() !== rate_id
    );
    // clac average rating
    const allRates = globalRating.rating.map((i) => i.rate);
    const total = allRates.reduce((sum, r) => sum + r, 0);
    const average = allRates.length ? +(total / allRates.length).toFixed(1) : 0;
    product.average_rate = average;
    await globalRating.save();
    await product.save();

    return res.json({ message: "تم حذف التقييم بنجاح" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

import { addRateProductVaildator } from "../../services/RateProductVailldator.js/addRateProduct.js";
import { Product } from "../../models/product.js";
import { RateProduct } from "../../models/rateProduct.js";

export const addRateProduct = async (req, res) => {
  const { id } = req.params;
  const { _id } = req.user;
  const { rate, comment } = req.body;

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

    let ratingData = { user_id: _id, rate };
    if (comment) {
      ratingData.comment = comment;
    }

    const globalRateing = await RateProduct.findOne({ product_id: id });
    if (!globalRateing) {
      const rateSaved = new RateProduct({
        product_id: id,
        rating: [ratingData],
        average: rate,
      });
      await rateSaved.save();
    }
    globalRateing.rating.push(ratingData);
    // clac average rating
    const allRates = globalRateing.rating.map((i) => i.rate);
    const total = allRates.reduce((sum, r) => sum + r, 0);
    const average = allRates.length ? +(total / allRates.length).toFixed(1) : 0;
    product.average_rate = average;
    await globalRateing.save();
    await product.save();
    return res.json({ globalRateing });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

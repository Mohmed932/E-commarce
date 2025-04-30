import { RateProduct } from "../../models/rateProduct.js";

export const readRateProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const globalRateing = await RateProduct.findOne({ product_id: id });
    if (!globalRateing) {
      return res
        .status(400)
        .json({ message: "لم يتم العثور علي  تقييم لهذا المنتج" });
    }
    return res.json({ globalRateing: globalRateing.average });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

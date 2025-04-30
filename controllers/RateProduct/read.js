import { RateProduct } from "../../models/rateProduct.js";

export const averageRateProduct = async (req, res) => {
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

export const readRateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 5;
    const skip = (page - 1) * limit;

    const globalRating = await RateProduct.findOne({ product_id: id });

    if (!globalRating || !Array.isArray(globalRating.rating)) {
      return res
        .status(404)
        .json({ message: "لم يتم العثور على تقييمات لهذا المنتج" });
    }

    const total = globalRating.rating.length;
    const paginatedRatings = globalRating.rating.slice(skip, skip + limit);

    return res.json({
      ratings: paginatedRatings,
      total,
      page,
      pages: Math.ceil(total / limit),
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "حدث خطأ في الخادم", error: error.message });
  }
};

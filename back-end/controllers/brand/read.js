import { Brand } from "../../models/brand.js";

export const collectBrand = async (req, res) => {
  const { id } = req.params;
  try {
    const brand = await Brand.find({ category: id });
    if (!brand) {
      return res.status(404).json({
        status: "fail",
        message: "العلامة التجارية غير موجودة",
      });
    }
    res.status(200).json({
      status: "success",
      data: brand,
    });
  } catch (error) {
    return res.status(500).json({
      status: "fail",
      message: error.message,
    });
  }
};

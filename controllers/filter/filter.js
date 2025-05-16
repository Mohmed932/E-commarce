import mongoose from "mongoose";
import { Product } from "../../models/product.js";

export const filterProducts = async (req, res) => {
    try {
        const {
            category,
            brand,
            minDiscount,
            maxDiscount,
            minRate,
            maxRate,
            color,
            size,
            minPrice,
            maxPrice,
        } = req.query;

        const filters = {};

        // ✅ تصنيف
        if (category && mongoose.Types.ObjectId.isValid(category)) {
            filters.category = category;
        }

        // ✅ ماركة
        if (brand) {
            filters.brand = brand;
        }

        // ✅ خصم
        if (minDiscount || maxDiscount) {
            filters.discount = {};
            if (minDiscount) filters.discount.$gte = Number(minDiscount);
            if (maxDiscount) filters.discount.$lte = Number(maxDiscount);
        }

        // ✅ تقييم
        if (minRate || maxRate) {
            filters.average_rate = {};
            if (minRate) filters.average_rate.$gte = Number(minRate);
            if (maxRate) filters.average_rate.$lte = Number(maxRate);
        }

        // ✅ الألوان والمقاسات والأسعار
        if (color || size || minPrice || maxPrice) {
            filters.colorsSizePrice = {
                $elemMatch: {
                    ...(color && { colorName: color }),
                    ...(size || minPrice || maxPrice
                        ? {
                            sizesAndPrices: {
                                $elemMatch: {
                                    ...(size && { size }), // فقط إذا كان size موجودًا
                                    ...(minPrice && { price: { $gte: Number(minPrice) } }),
                                    ...(maxPrice && {
                                        price: {
                                            ...(minPrice ? { $gte: Number(minPrice) } : {}),
                                            $lte: Number(maxPrice)
                                        }
                                    }),
                                },
                            },
                        }
                        : {}),
                },
            };
        }
        const products = await Product.find(filters);
        return res.json(products);
    } catch (err) {
        res.status(500).json({
            error: "حدث خطأ أثناء فلترة المنتجات",
            details: err.message,
        });
    }
};

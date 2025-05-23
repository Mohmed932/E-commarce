import { WishList } from "../../models/wishList.js";

export const addWishList = async (req, res) => {
    const { id } = req.params;
    const userId = req.user._id;
    try {
        // Check if the product is already in the wishlist
        const existingWishlist = await WishList.findOne({ userId });
        if (existingWishlist) {
            const productExists = existingWishlist.products.some(
                (product) => product.productId.toString() === id
            );
            if (productExists) {
                return res.status(400).json({
                    message: "المنتج موجود بالفعل في قائمة الأمنيات",
                });
            }
            // Add the product to the existing wishlist
            existingWishlist.products.push({ productId: id });
            await existingWishlist.save();
            return res.status(201).json({
                message: "تمت إضافة المنتج إلى قائمة الأمنيات بنجاح",
                wishlist: existingWishlist,
            });
        }
        const wishlist = new WishList({
            userId,
            products: [
                {
                    productId: id
                }
            ]
        });
        await wishlist.save();
        return res.status(201).json({
            message: "تمت إضافة المنتج إلى قائمة الأمنيات بنجاح",
            wishlist,
        });
    } catch (error) {
        return res
            .status(500)
            .json({ message: "حدث خطأ في الخادم", error: error.message });
    }
};

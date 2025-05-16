import { WishList } from "../../models/wishList.js";

export const deleteWishList = async (req, res) => {
    const { id } = req.params;
    const userId = req.user._id;
    try {
        // Check if the product is already in the wishlist
        const existingWishlist = await WishList.findOne({
            userId,
            "products.productId": id
        });
        if (!existingWishlist) {
            return res.status(400).json({
                message: "المنتج غير موجود في قائمة الأمنيات",
            });
        }
        // Remove the product from the wishlist
        const wishlist = await WishList.findOneAndUpdate(
            { userId },
            { $pull: { products: { productId: id } } },
            { new: true }
        );
        if (!wishlist) {
            return res.status(404).json({
                message: "قائمة الأمنيات غير موجودة",
            });
        }
        return res.status(201).json({
            message: "تمت إزالة المنتج من قائمة الأمنيات بنجاح",
        });
    } catch (error) {
        return res
            .status(500)
            .json({ message: "حدث خطأ في الخادم", error: error.message });
    }
};

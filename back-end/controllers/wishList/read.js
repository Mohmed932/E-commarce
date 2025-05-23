import { WishList } from "../../models/wishList.js";

export const readWishList = async (req, res) => {
    const userId = req.user._id;
    try {
        // Check if the product is already in the wishlist
        const existingWishlist = await WishList.findOne({ userId }).populate("products.productId");
        if (!existingWishlist) {
            return res.status(400).json({
                message: "لم تقم باضافه اي منتجات بعد الي قائمه الامنيات",
            });
        }
        return res.status(201).json({
            existingWishlist
        });
    } catch (error) {
        return res
            .status(500)
            .json({ message: "حدث خطأ في الخادم", error: error.message });
    }
};

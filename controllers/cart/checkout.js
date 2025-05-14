import { Product } from "../../models/product.js";
import { Cart } from "../../models/cart.js";

export const checkout = async (req, res) => {
    const { _id } = req.user;

    try {
        const cart = await Cart.findOne({ user: _id });
        if (!cart || cart.products.length === 0) {
            return res.status(404).json({ message: "Cart is empty or not found" });
        }

        const updatedProducts = [];
        const ignoredProducts = [];
        let totalPrice = 0;

        for (const item of cart.products) {
            const product = await Product.findById(item.product_id);

            if (!product) {
                ignoredProducts.push({
                    product_id: item.product_id,
                    reason: "المنتج غير موجود"
                });
                continue;
            }

            const colorVariant = product.colorsSizePrice.find(c => c.colorName === item.colorName);
            if (!colorVariant) {
                ignoredProducts.push({
                    product_id: item.product_id,
                    name: product.name,
                    reason: `اللون ${item.colorName} غير متاح لهذا المنتج`
                });
                continue;
            }

            const availableVariant = colorVariant.sizesAndPrices.find(s => s.available === true);
            if (!availableVariant) {
                ignoredProducts.push({
                    product_id: item.product_id,
                    name: product.name,
                    reason: `اللون ${item.colorName} غير متاح بأي مقاس حاليًا`
                });
                continue;
            }

            const sizeVariant = colorVariant.sizesAndPrices.find(s => s.size === item.size);
            if (!sizeVariant) {
                ignoredProducts.push({
                    product_id: item.product_id,
                    name: product.name,
                    reason: `المقاس ${item.size} غير متاح لهذا اللون`
                });
                continue;
            }

            // تحقق من الكمية المتاحة
            if (item.quantity > sizeVariant.quantity) {
                ignoredProducts.push({
                    product_id: item.product_id,
                    name: product.name,
                    reason: `الكمية المطلوبة أكبر من الكمية المتاحة لهذا المنتج`
                });
                continue;
            }

            // تحديث السعر والإجمالي
            item.price = sizeVariant.price;
            totalPrice += item.price * item.quantity;

            updatedProducts.push({
                product_id: item.product_id,
                name: product.name,
                color: item.colorName,
                size: item.size,
                price: item.price,
                quantity: item.quantity,
            });
        }

        if (updatedProducts.length === 0) {
            return res.status(400).json({
                message: "لم تعد أي من المنتجات المحددة متاحة حالياً",
                ignoredProducts
            });
        }

        cart.totalPrice = totalPrice;
        await cart.save();

        return res.status(200).json({
            message: "تمت عملية التحقق من السلة بنجاح",
            checkoutProducts: updatedProducts,
            ignoredProducts
        });

    } catch (error) {
        console.error("Error during checkout:", error);
        return res.status(500).json({ message: "حدث خطأ داخلي في الخادم" });
    }
};

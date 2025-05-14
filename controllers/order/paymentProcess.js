import { CachingOrder } from "../../models/cachingOrder.js";
import { Order } from "../../models/order.js";
import { Product } from "../../models/product.js";

export const paymentProcess = async (req, res) => {
  try {
    // التحقق من وجود البيانات المرسلة من بوابة الدفع
    if (!req.body.obj || !req.body.obj.success || !req.body.obj.order) {
      return res.status(400).json({ message: "Invalid request data" });
    }

    // التحقق من نجاح الدفع من قبل بوابة الدفع
    if (req.body.obj.success) {
      // البحث عن المنتج باستخدام معرّف الطلب
      const product = await CachingOrder.findOne({
        _id: req.body.obj.order.merchant_order_id,
      });

      // التحقق من وجود المنتج
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      // تحديث الكميات لجميع المنتجات في الطلب
      try {
        const updateProductPromises = product.products.map(async (item) => {
          const getProduct = await Product.findById(item.product_id);
          if (!getProduct) {
            throw new Error(`Product with ID ${item.product_id} not found`);
          }

          const colorName = getProduct.colorsSizePrice.find(i => i.colorName === item.colorName);
          if (!colorName) {
            throw new Error(`Color ${item.colorName} not found for product ${item.product_id}`);
          }

          const sizeName = colorName.colorsSizePrice.find(i => i.size === item.size);
          console.log("sizeName", sizeName);
          if (!sizeName) {
            throw new Error(`Size ${item.size} not found for color ${item.colorName}`);
          }

          sizeName.quantity -= item.quantity;
          await getProduct.save();
        });

        await Promise.all(updateProductPromises);
      } catch (error) {
        return res.status(500).json({ message: `Product update failed: ${error.message}` });
      }

      // حفظ الطلب الجديد في قاعدة البيانات
      const saveOrder = new Order({
        user: product.user,
        shippingCost: product.shippingCost,
        totalPrice: product.totalPrice,
        shippingAddress: product.shippingAddress,
        products: product.products,
        confirmOrder: true,
        taxes: product.taxes,
        paymentMethod: "credit_card",
        status: "processing",
        paidBy: product.user,
        isPaid: true,
        paidAt: Date.now(),
        total_price_paid: req.body.obj.amount_cents / 100,
      });

      await saveOrder.save();

      // حذف الطلب من الـ CachingOrder بعد الدفع
      await CachingOrder.deleteOne({
        _id: req.body.obj.order.merchant_order_id,
      });

      return res.status(200).json({ message: "Payment processed successfully" });
    } else {
      // إذا كانت حالة الدفع غير ناجحة
      return res.status(400).json({ message: "Payment was not successful" });
    }
  } catch (error) {
    // التعامل مع الأخطاء العامة
    return res.status(500).json({ message: `Internal server error: ${error.message}` });
  }
};

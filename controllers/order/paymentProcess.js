import { CachingOrder } from "../../models/cachingOrder.js";
import { Order } from "../../models/order.js";

export const paymentProcess = async (req, res) => {
  try {
    // التحقق من وجود البيانات
    if (!req.body.obj || !req.body.obj.success || !req.body.obj.order) {
      return res.status(400).json({ message: "Invalid request data" });
    }

    // التعامل مع حالة نجاح الدفع
    if (req.body.obj.success) {
      // البحث عن المنتج باستخدام معرّف الطلب
      const product = await CachingOrder.findOne({
        _id: req.body.obj.order.merchant_order_id,
      });

      // التحقق من وجود المنتج
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      // حفظ الطلب الجديد
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
      });

      await saveOrder.save();
      await CachingOrder.deleteOne({
        _id: req.body.obj.order.merchant_order_id,
      });
    }
    return;
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

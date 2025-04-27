import mongoose from "mongoose";
import { Order } from "../models/order.js";
import { Product } from "../models/product.js";
import { User } from "../models/user.js";
import { CachingOrder } from "../models/cachingOrder.js";
import {
  createPaymentKey,
  createPaymobOrder,
  getPaymobToken,
} from "../utils/payment/paymob.js";

export const getOrders = async (req, res) => {
  const { _id } = req.user;
  try {
    const orders = await Order.find({ user: _id });
    if (!orders) {
      return res.status(400).json({ message: "لم يتم العثور علي الطلبات" });
    }
    return res.json({ orders });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const createOrder = async (req, res) => {
  const { _id } = req.user;
  const { productsData, paymentMethod } = req.body;

  try {
    const products_id = productsData
      .map((item) => item.product_id)
      .filter((id) => mongoose.Types.ObjectId.isValid(id));

    const products = await Product.find({ _id: { $in: products_id } });

    if (products.length === 0) {
      return res.status(400).json({ message: "No valid products found" });
    }

    let totalPrice = 0;

    productsData.forEach((item) => {
      const matchedProduct = products.find(
        (p) => p._id.toString() === item.product_id
      );
      if (matchedProduct && item.quantity > 0) {
        const itemTotal = Math.ceil(item.quantity * matchedProduct.finalPrice);
        totalPrice += itemTotal;
        item.price = Math.ceil(matchedProduct.finalPrice); // تم التعديل هنا أيضًا
      }
    });

    const user = await User.findOne({ _id });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    let saveOrder;
    const shippingCost = totalPrice > 2000 ? 50 : 0;
    if (paymentMethod === "cash") {
      saveOrder = new Order({
        user: _id,
        shippingCost,
        totalPrice: totalPrice + shippingCost,
        paymentMethod: paymentMethod,
        shippingAddress: user.adress,
        products: productsData,
        confirmOrder: true,
        status: "processing",
      });
      await saveOrder.save();
      return res.json({ saveOrder });
    } else {
      const taxes = (3 / 100) * totalPrice;
      saveOrder = new CachingOrder({
        user: _id,
        taxes,
        shippingCost,
        totalPrice: taxes + shippingCost + totalPrice,
        shippingAddress: user.adress,
        products: productsData,
      });
      await saveOrder.save();
      const authToken = await getPaymobToken();
      const orderId = await createPaymobOrder(
        authToken,
        totalPrice,
        saveOrder._id
      );
      const payment_token = await createPaymentKey(
        authToken,
        orderId,
        user,
        Math.ceil(taxes + shippingCost + totalPrice)
      );
      return res.json({ payment_token });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateOrder = async (req, res) => {
  const { email } = req.user;
  // const { totalPricePaid } = req.body;
  const { id } = req.params;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ message: "لم يتم العثور علي هذا المستخدم" });
    }
    if (user.role === "user") {
      return res
        .status(401)
        .json({ message: "غير مسموح لك بتحديث هذا المنتج" });
    }
    const order = await Order.findOne({ _id: id });
    if (!order) {
      return res.status(400).json({ message: "لم يتم العثور علي الطلب" });
    }
    if (order.isPaid) {
      order.deliveredAt = Date.now();
    } else {
      order.isPaid = true;
      // order.totalPricePaid = totalPricePaid;
      order.paidBy = email;
      order.deliveredAt = Date.now();
      order.paidAt = Date.now();
    }
    await order.save();
    return res.json({ order });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

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
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

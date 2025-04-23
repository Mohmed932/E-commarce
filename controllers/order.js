import mongoose from "mongoose";
import { Order } from "../models/order.js";
import { Product } from "../models/product.js";
import { User } from "../models/user.js";
import { CachingOrder } from "../models/cachingOrder.js";

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
    const shippingCost = totalPrice > 2000 ? 0 : 50;
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
    }
    await saveOrder.save();
    return res.json({ saveOrder });
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

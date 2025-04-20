import mongoose from "mongoose";
import { Order } from "../models/order.js";
import { Product } from "../models/product.js";
import { User } from "../models/user.js";

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
    // فلترة IDs الصحيحة
    const products_id = productsData
      .map((item) => item.product_id)
      .filter((id) => mongoose.Types.ObjectId.isValid(id));

    const products = await Product.find({ _id: { $in: products_id } });

    let totalPrice = 0;

    productsData.forEach((item) => {
      const matchedProduct = products
        .find((p) => p._id.toString() === item.product_id)
        .filter((id) => mongoose.Types.ObjectId.isValid(id));

      if (matchedProduct && item.quantity > 0) {
        const itemTotal = Math.ceil(item.quantity * matchedProduct.finalPrice);
        totalPrice += itemTotal;
      }
    });
    productsData.map((item) => {
      products.map((i) => {
        item.price = Math.ceil(i.finalPrice);
      });
    });
    const { adress } = await User.findOne({ _id });
    const saveOrder = new Order({
      user: _id,
      totalPrice,
      paymentMethod: paymentMethod ? paymentMethod : "",
      shippingAddress: adress,
      products: productsData,
    });
    if (saveOrder.paymentMethod === "cash") {
      saveOrder.confirmOrder = true;
      saveOrder.status = "processing";
    }
    await saveOrder.save();
    return res.json({ saveOrder });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateOrder = async (req, res) => {
  const { email } = req.user;
  const { totalPricePaid } = req.body;
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
    order.isPaid = true;
    order.totalPricePaid = totalPricePaid;
    order.paidBy = email;
    order.deliveredAt = Date.now();
    order.paidAt = Date.now();
    await order.save();
    return res.json({ order });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

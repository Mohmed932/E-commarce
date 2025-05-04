import { CachingOrder } from "../../models/cachingOrder.js";
import { Order } from "../../models/order.js";
import { Product } from "../../models/product.js";
import { User } from "../../models/user.js";
import { orderValidator } from "../../services/orderVaildator.js";
import {
  createPaymentKey,
  createPaymobOrder,
  getPaymobToken,
} from "../../payment/paymob.js";

export const createOrder = async (req, res) => {
  const { _id } = req.user;
  const { productsData, paymentMethod } = req.body;
  const { error } = orderValidator({ productsData, paymentMethod });
  if (error) {
    return res
      .status(400)
      .json({ message: error.details.map((detail) => detail.message) });
  }
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

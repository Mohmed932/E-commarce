import { Order } from "../../models/order.js";

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

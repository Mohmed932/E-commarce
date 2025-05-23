import { Order } from "../../models/order.js";
import { User } from "../../models/user.js";

export const updateOrder = async (req, res) => {
  const { email } = req.user;
  const { id } = req.params;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ message: "لم يتم العثور علي هذا المستخدم" });
    }
    const order = await Order.findOne({ _id: id });
    if (!order) {
      return res.status(400).json({ message: "لم يتم العثور علي الطلب" });
    }
    if (order.isPaid) {
      order.deliveredAt = Date.now();
    } else {
      order.isPaid = true;
      order.total_price_paid = order.totalPrice;
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

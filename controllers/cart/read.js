import { Cart } from "../../models/cart.js";

export const getCart = async (req, res) => {
  const { _id } = req.user;
  try {
    const cartProduct = await Cart.findOne({ user: _id });
    if (!cartProduct) {
      return res.status(400).json({ message: "لم تقم باضافه منتجات بعد" });
    }
    return res.json({ product: cartProduct });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

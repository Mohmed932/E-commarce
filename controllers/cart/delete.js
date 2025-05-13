import { Cart } from "../../models/cart.js";

export const deleteProductFromCart = async (req, res) => {
  const { _id } = req.user;
  const { id } = req.params;

  try {
    const cartProduct = await Cart.findOne({ user: _id });

    if (!cartProduct || cartProduct.products.length === 0) {
      return res.status(400).json({ message: "لم تقم بإضافة منتجات بعد" });
    }

    const ishere = cartProduct.products.find(
      (item) => item.product_id.toString() === id
    );

    if (!ishere) {
      return res.status(400).json({ message: "لم نعثر على هذا المنتج" });
    }

    cartProduct.products = cartProduct.products.filter(
      (item) => item.product_id.toString() !== id
    );
    // تحديث السعر الإجمالي
    const totalPrice = cartProduct.products.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );

    cartProduct.totalPrice = Math.ceil(totalPrice * 10) / 10;
    await cartProduct.save();

    return res.json({ message: "تم حذف المنتج من السلة", cart: cartProduct });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

import { Cart } from "../../models/cart.js";
import { Product } from "../../models/product.js";
import { cartValidation } from "../../services/cartVaildator.js";

export const updateCart = async (req, res) => {
  const { _id } = req.user;
  const { product_id, quantity, colors, sizes } = req.body;
  // التحقق من صحة البيانات المدخلة
  const { error } = cartValidation.validate(req.body, { abortEarly: false });

  if (error) {
    const errorMessages = error.details.map((detail) => detail.message);
    return res.status(400).json({
      status: "error",
      message: errorMessages,
    });
  }

  try {
    // التحقق من وجود المنتج
    const checkProduct = await Product.findById(product_id);
    if (!checkProduct) {
      return res.status(404).json({ message: "لم يتم العثور على المنتج." });
    }

    const cartProduct = await Cart.findOne({ user: _id });
    if (!cartProduct) {
      return res.status(400).json({ message: "لم تقم باضافه منتجات بعد" });
    }
    cartProduct.products = {
      product_id,
      quantity,
      sizes,
      colors,
      price: checkProduct.finalPrice,
    };
    await cartProduct.save();
    return res.json({ product: cartProduct });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

import { Cart } from "../../models/cart.js";
import { Product } from "../../models/product.js";
import { cartValidation } from "../../services/cartVaildator.js";

export const updateCart = async (req, res) => {
  const { _id } = req.user;
  const { id } = req.params; // يُفترض أن هذا هو معرّف المنتج داخل السلة
  const { product_id, colorName, size, quantity } = req.body;

  // ✅ التحقق من صحة البيانات
  const { error } = cartValidation.validate(req.body, { abortEarly: false });
  if (error) {
    const errorMessages = error.details.map((detail) => detail.message);
    return res.status(400).json({
      status: "error",
      message: errorMessages,
    });
  }

  try {
    // ✅ التحقق من وجود المنتج
    const checkProduct = await Product.findById(product_id);
    if (!checkProduct) {
      return res.status(404).json({ message: "لم يتم العثور على المنتج." });
    }

    // ✅ التحقق من وجود السلة
    const cartProduct = await Cart.findOne({ user: _id });
    if (!cartProduct) {
      return res.status(400).json({ message: "لم تقم بإضافة منتجات بعد." });
    }

    // ✅ البحث عن المنتج داخل السلة حسب معرفه
    const existProduct = cartProduct.products.find(
      (item) => item.product_id.toString() === id
    );
    if (!existProduct) {
      return res.status(400).json({ message: "لم يتم العثور على هذا المنتج في السلة." });
    }

    // ✅ تحديث خصائص المنتج
    existProduct.product_id = product_id;
    existProduct.quantity = quantity;
    existProduct.size = size;
    existProduct.colorName = colorName;

    // ✅ التحقق من السعر بناءً على اللون والحجم
    const colorItem = checkProduct.colorsSizePrice.find(
      (item) => item.colorName === colorName
    );
    if (!colorItem) {
      return res.status(400).json({ message: "اللون المحدد غير متوفر." });
    }

    const sizePrice = colorItem.sizesAndPrices.find(
      (item) => item.size === size
    );
    if (!sizePrice) {
      return res.status(400).json({ message: "الحجم المحدد غير متوفر لهذا اللون." });
    }

    existProduct.price = sizePrice.finalPrice;

    // ✅ تحديث السعر الإجمالي للسلة
    const totalPrice = cartProduct.products.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    cartProduct.totalPrice = Math.ceil(totalPrice * 10) / 10;

    await cartProduct.save();

    return res.json({ product: cartProduct });

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

import { Cart } from "../../models/cart.js";
import { Product } from "../../models/product.js";
import { cartValidation } from "../../services/cartVaildator.js";

export const addProductToCart = async (req, res) => {
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
    const cartProduct = await Product.findById(product_id);
    if (!cartProduct) {
      return res.status(404).json({ message: "لم يتم العثور على المنتج." });
    }

    const checkUserCart = await Cart.findOne({ user: _id });
    if (checkUserCart) {
      // إضافة المنتج
      checkUserCart.products.push({
        product: product_id,
        quantity,
        colors,
        sizes,
        price: cartProduct.finalPrice,
      });

      // حساب السعر الإجمالي
      const totalPrice = checkUserCart.products.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );

      checkUserCart.totalPrice = Math.ceil(totalPrice);

      await checkUserCart.save();

      return res.status(201).json({
        message: "تمت إضافة المنتج وتحديث السعر الكلي",
        cart: checkUserCart,
      });
    } else {
      const newCart = new Cart({
        user: _id,
        products: [
          {
            product: product_id,
            quantity,
            colors,
            sizes,
            price: cartProduct.finalPrice,
          },
        ],
        totalPrice: Math.ceil(quantity * cartProduct.finalPrice),
      });

      await newCart.save();

      return res
        .status(201)
        .json({ message: "تمت إضافة المنتج إلى السلة بنجاح", cart: newCart });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "حدث خطأ في الخادم", error: error.message });
  }
};

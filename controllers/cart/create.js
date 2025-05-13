import { Cart } from "../../models/cart.js";
import { Product } from "../../models/product.js";
import { cartValidation } from "../../services/cartVaildator.js";

export const addProductToCart = async (req, res) => {
  const { _id } = req.user;
  const { product_id, colorName, size, quantity } = req.body;

  // التحقق من صحة البيانات المدخلة
  const { error } = cartValidation.validate(req.body, { abortEarly: false });
  if (error) {
    const errorMessages = error.details.map((detail) => detail.message);
    return res.status(400).json({ status: "validation_error", message: errorMessages });
  }

  try {
    // التحقق من وجود المنتج
    const cartProduct = await Product.findById(product_id);
    if (!cartProduct) {
      return res.status(404).json({ status: "not_found", message: "لم يتم العثور على المنتج." });
    }

    // الحصول على الصور من قاعدة البيانات بدل الطلب
    const selectedColor = cartProduct.colorsSizePrice.find((color) => color.colorName === colorName);
    if (!selectedColor) {
      return res.status(400).json({ status: "color_not_found", message: "لم يتم العثور على اللون المحدد." });
    }

    const imageToUse = selectedColor.images || [];

    // التحقق من الحجم والسعر والكمية
    const sizeMatch = selectedColor.sizesAndPrices.find(({ size: s }) => s === size);
    if (!sizeMatch) {
      return res.status(400).json({ status: "size_not_found", message: "لم يتم العثور على المقاس المطلوب." });
    }

    const { finalPrice, available, quantity: availableQty } = sizeMatch;

    if (!available) {
      return res.status(400).json({ status: "product_unavailable", message: "هذا المنتج غير متاح." });
    }

    if (quantity > availableQty) {
      return res.status(400).json({ status: "insufficient_quantity", message: "الكمية المطلوبة أكبر من المتاحة." });
    }

    // تابع الإضافة للسلة
      const checkUserCart = await Cart.findOne({ user: _id });

      if (checkUserCart) {
        const existingProduct = checkUserCart.products.find((item) =>
          item.product_id.toString() === product_id.toString() &&
          item.colorName === colorName &&
          item.size === size
        );

        if (existingProduct) {
          return res.status(400).json({
            status: "product_already_exists",
            message: "هذا المنتج موجود بالفعل في السلة بنفس اللون والمقاس.",
          });
        }

        checkUserCart.products.push({
          product_id,
          quantity,
          size,
          colorName,
          images: imageToUse,
          price: finalPrice,
        });

        const totalPrice = checkUserCart.products.reduce(
          (acc, item) => acc + item.price * item.quantity,
          0
        );

        checkUserCart.totalPrice = Number(totalPrice.toFixed(1));

        await checkUserCart.save();

        return res.status(200).json({
          status: "success",
          message: "تمت إضافة المنتج وتحديث السعر الكلي",
          cart: checkUserCart,
        });

      } else {
        const newCart = new Cart({
          user: _id,
          products: [
            {
              product_id,
              quantity,
              size,
              colorName,
              images: imageToUse,
              price: finalPrice,
            },
          ],
          totalPrice: Number((quantity * finalPrice).toFixed(1))
        });

        await newCart.save();

        return res.status(201).json({
          status: "created",
          message: "تمت إضافة المنتج إلى السلة بنجاح",
          cart: newCart,
        });
      }
    
  } catch (error) {
    return res.status(500).json({ status: "server_error", message: "حدث خطأ في الخادم", error: error.message });
  }
};

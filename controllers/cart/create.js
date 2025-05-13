import { Cart } from "../../models/cart.js";
import { Product } from "../../models/product.js";
import { cartValidation } from "../../services/cartVaildator.js";

export const addProductToCart = async (req, res) => {
  const { _id } = req.user;
  const { product_id, colorsSizePrice } = req.body;

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

    const finishcart = async (finalPrice) => {
      const checkUserCart = await Cart.findOne({ user: _id });
      if (checkUserCart) {
        checkUserCart.products.push({
          product_id,
          quantity: colorsSizePrice.sizesAndPrices.quantity,
          size: colorsSizePrice.sizesAndPrices.size,
          colorsSizePrice: {
            colorName: colorsSizePrice.colorName,
            images: colorsSizePrice.images,
          },
          price: finalPrice,
        });

        // حساب السعر الإجمالي
        const totalPrice = checkUserCart.products.reduce(
          (acc, item) => acc + item.price * item.quantity,
          0
        );

        checkUserCart.totalPrice = Math.ceil(totalPrice * 10) / 10;

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
              quantity: colorsSizePrice.sizesAndPrices.quantity,
              size: colorsSizePrice.sizesAndPrices.size,
              colorsSizePrice: {
                colorName: colorsSizePrice.colorName,
                images: colorsSizePrice.images,
              },
              price: finalPrice,
            },
          ],
          totalPrice: Math.ceil(colorsSizePrice.sizesAndPrices.quantity * finalPrice * 10) / 10,
        });

        await newCart.save();

        return res.status(201).json({
          status: "created",
          message: "تمت إضافة المنتج إلى السلة بنجاح",
          cart: newCart,
        });
      }
    };

    let productFound = false;

    // استبدال forEach بـ for...of مع await
    for (const item of cartProduct.colorsSizePrice) {
      // تحقق من اللون
      if (item.colorName === colorsSizePrice.colorName) {
        // تحقق من المقاس
        for (const { size, finalPrice, available, quantity } of item.sizesAndPrices) {
          if (available) {
            if (size === colorsSizePrice.sizesAndPrices.size) {
              if (quantity < colorsSizePrice.sizesAndPrices.quantity) {
                return res.status(400).json({ status: "insufficient_quantity", message: "الكمية المطلوبة أكبر من المتاحة." });
              } else {
                productFound = true;
                return finishcart(finalPrice); // إنهاء العملية بعد إضافة المنتج للسلة
              }
            } else {
              return res.status(400).json({ status: "size_not_found", message: "لم يتم العثور على هذا المقاس." });
            }
          } else {
            return res.status(400).json({ status: "product_unavailable", message: "هذا المنتج غير متاح." });
          }
        }
      }
    }

    // إذا لم يتم العثور على المنتج في الألوان أو المقاسات المحددة
    if (!productFound) {
      return res.status(400).json({ status: "color_or_size_not_found", message: "لم يتم العثور على المنتج في الألوان أو المقاسات المحددة." });
    }

  } catch (error) {
    return res.status(500).json({ status: "server_error", message: "حدث خطأ في الخادم", error: error.message });
  }
};

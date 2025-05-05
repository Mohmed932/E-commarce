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
import mongoose from "mongoose";

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
    // تحقق من وجود المستخدم والعنوان
    const user = await User.findById(_id);
    const userAddress = user?.address?.[0];

    if (!user) {
      return res.status(404).json({ message: "المستخدم غير موجود." });
    }
    if (!userAddress) {
      return res.status(401).json({ message: "يجب اضافه عنوانك." });
    }

    // تحقق من صلاحية الـ IDs
    const validIds = productsData
      .map((item) => item.product_id)
      .filter((id) => mongoose.Types.ObjectId.isValid(id));

    if (validIds.length !== productsData.length) {
      return res.status(400).json({ message: "بعض المنتجات غير صالحة." });
    }

    const products = await Product.find({ _id: { $in: validIds } });

    if (products.length === 0) {
      return res
        .status(400)
        .json({ message: "لم يتم العثور على منتجات صالحة." });
    }

    let totalPrice = 0;
    const validProductsData = [];

    for (const item of productsData) {
      const product = products.find(
        (p) => p._id.toString() === item.product_id
      );
      const quantity = Number(item.quantity);

      // تحقق من الكمية وسعر المنتج
      if (product && quantity > 0 /* && quantity <= product.stock */) {
        const price = Math.ceil(product.finalPrice);
        const itemTotal = Math.ceil(quantity * product.finalPrice);
        totalPrice += itemTotal;

        validProductsData.push({
          ...item,
          quantity,
          price,
        });
      }
    }

    if (validProductsData.length === 0) {
      return res
        .status(400)
        .json({ message: "الكمية غير صالحة أو المنتجات غير متوفرة." });
    }

    // حساب الشحن والضرائب
    const shippingCost = totalPrice > 2000 ? 50 : 0;
    const taxes = paymentMethod !== "cash" ? (3 / 100) * totalPrice : 0;
    const fullTotal = Math.ceil(totalPrice + shippingCost + taxes);

    const addressInfo = {
      governorate: userAddress.governorate,
      center: userAddress.center,
      landmark: userAddress.landmark,
      primaryPhone: userAddress.primaryPhone,
      extraPhone: userAddress.extraPhone,
      fullName: userAddress.fullName,
    };

    // في حالة الدفع النقدي
    if (paymentMethod === "cash") {
      const newOrder = new Order({
        user: _id,
        shippingCost,
        totalPrice: fullTotal,
        paymentMethod,
        shippingAddress: addressInfo,
        products: validProductsData,
        confirmOrder: true,
        status: "processing",
      });

      await newOrder.save();
      return res.json({ order: newOrder });
    }

    // في حالة الدفع الإلكتروني
    const cachingOrder = new CachingOrder({
      user: _id,
      taxes,
      shippingCost,
      totalPrice: fullTotal,
      shippingAddress: addressInfo,
      products: validProductsData,
    });

    await cachingOrder.save();

    const authToken = await getPaymobToken();
    const orderId = await createPaymobOrder(
      authToken,
      totalPrice,
      cachingOrder._id
    );
    const payment_token = await createPaymentKey(
      authToken,
      orderId,
      user,
      fullTotal
    );

    return res.json({
      payment_token,
      cachingOrderId: cachingOrder._id,
    });
  } catch (error) {
    console.error("Error in createOrder:", error);
    return res.status(500).json({ message: "حدث خطأ أثناء معالجة الطلب." });
  }
};

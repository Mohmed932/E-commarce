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
    const user = await User.findById(_id);
    const userAddress = user?.address?.[0];

    if (!user) {
      return res.status(404).json({ message: "المستخدم غير موجود." });
    }
    if (!userAddress) {
      return res.status(401).json({ message: "يجب اضافه عنوانك." });
    }

    const validIds = productsData
      .map((item) => item.product_id)
      .filter((id) => mongoose.Types.ObjectId.isValid(id));

    if (validIds.length !== productsData.length) {
      return res.status(400).json({ message: "بعض المنتجات غير صالحة." });
    }

    const productDocs = await Product.find({ _id: { $in: validIds } });
    const productMap = new Map(productDocs.map(p => [p._id.toString(), p]));

    const requestedProducts = [];
    const ignoredProducts = [];
    const bulkUpdates = [];

    for (const item of productsData) {
      const product = productMap.get(item.product_id);
      if (!product) {
        ignoredProducts.push({
          product_id: item.product_id,
          title: null,
          reason: "المنتج غير موجود"
        });
        continue;
      }

      const color = product.colorsSizePrice.find(i => i.colorName === item.colorName);
      if (!color) {
        ignoredProducts.push({
          product_id: item.product_id,
          title: product.title,
          reason: `اللون ${item.colorName} غير متاح`
        });
        continue;
      }

      const size = color.sizesAndPrices.find(i => i.size === item.size);
      if (!size) {
        ignoredProducts.push({
          product_id: item.product_id,
          title: product.title,
          reason: `المقاس ${item.size} غير متاح للون ${item.colorName}`
        });
        continue;
      }

      if (item.quantity > size.quantity) {
        ignoredProducts.push({
          product_id: item.product_id,
          title: product.title,
          reason: `الكمية المطلوبة (${item.quantity}) أكبر من المتاحة (${size.quantity})`
        });
        continue;
      }

      requestedProducts.push({
        product_id: item.product_id,
        quantity: item.quantity,
        size: item.size,
        colorName: item.colorName,
        price: size.finalPrice,
        images: item.images
      });

      // يتم خصم الكمية مؤقتاً في الذاكرة فقط، وسيتم تنفيذ الخصم الحقيقي لاحقاً إذا كانت كاش
      size.quantity -= item.quantity;

      bulkUpdates.push({
        updateOne: {
          filter: { _id: product._id },
          update: { $set: { colorsSizePrice: product.colorsSizePrice } }
        }
      });
    }

    if (requestedProducts.length === 0) {
      return res.status(400).json({
        message: "لم يتم العثور على منتجات صالحة للطلب.",
        ignoredProducts
      });
    }

    const startPrice = requestedProducts.reduce((acc, item) => {
      return acc + item.price * item.quantity;
    }, 0);

    const shippingCost = startPrice > 2000 ? 50 : 0;
    const taxes = paymentMethod !== "cash" ? (3 / 100) * startPrice : 0;
    const fullTotal = startPrice + shippingCost + taxes;

    const addressInfo = {
      governorate: userAddress.governorate,
      center: userAddress.center,
      landmark: userAddress.landmark,
      primaryPhone: userAddress.primaryPhone,
      extraPhone: userAddress.extraPhone,
      fullName: userAddress.fullName,
    };

    // الدفع كاش
    if (paymentMethod === "cash") {
      // يتم هنا تنفيذ الخصم فعليًا
      if (bulkUpdates.length > 0) {
        await Product.bulkWrite(bulkUpdates);
      }

      const newOrder = new Order({
        user: _id,
        shippingCost,
        totalPrice: fullTotal,
        paymentMethod,
        shippingAddress: addressInfo,
        products: requestedProducts,
        confirmOrder: true,
        status: "processing",
      });

      await newOrder.save();

      return res.json({
        order: newOrder,
        ignoredProducts
      });
    }

    // الدفع إلكتروني - لا يتم خصم الكمية الآن
    const cachingOrder = new CachingOrder({
      user: _id,
      taxes,
      shippingCost,
      totalPrice: fullTotal,
      shippingAddress: addressInfo,
      products: requestedProducts,
    });

    await cachingOrder.save();

    // const authToken = await getPaymobToken();
    // const orderId = await createPaymobOrder(
    //   authToken,
    //   fullTotal,
    //   cachingOrder._id
    // );
    // const payment_token = await createPaymentKey(
    //   authToken,
    //   orderId,
    //   user,
    //   fullTotal
    // );

    return res.json({
      // payment_token,
      cachingOrderId: cachingOrder._id,
      ignoredProducts
    });

  } catch (error) {
    console.error("Error in createOrder:", error);
    return res.status(500).json({ message: "حدث خطأ أثناء معالجة الطلب." });
  }
};

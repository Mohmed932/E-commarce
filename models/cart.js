import { Schema, model } from "mongoose";

const cartSchema = new Schema(
  {
    products: {
      type: [
        {
          product_id: {
            type: Schema.Types.ObjectId,
            ref: "Product",
            required: true,
          },
          quantity: {
            type: Number,
            required: [true, "يجب إضافة منتج واحد على الأقل"],
            min: [1, "الكمية يجب أن تكون واحد على الأقل"],
          },
          size: {
            type: String,
            required: [true, "الرجاء تحديد اللون."],
          },
          colorName: {
            type: String,
            required: [true, "الرجاء تحديد اللون."],
          },
          images: {
            type: [
              {
                img: {
                  type: String,
                  required: [true, "الرجاء إضافة صورة."],
                },
                idOfImage: { type: String },
              },
            ],
            required: [true, "الرجاء إضافة صور للمنتج."],
          },
          price: {
            type: Number,
            required: [true, "يجب تحديد السعر"],
            min: [0, "السعر لا يمكن أن يكون بالسالب"],
          },
        },
      ],
      required: [true, "يجب أن يكون هناك منتجات"],
    },
    totalPrice: {
      type: Number,
      required: [true, "يجب تحديد السعر الكلي"],
      min: [0, "السعر الكلي لا يمكن أن يكون صفر او اقل منه"],
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export const Cart = model("Cart", cartSchema);

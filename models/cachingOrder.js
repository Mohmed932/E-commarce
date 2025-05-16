import { model, Schema } from "mongoose";

const cachingOrderSchema = new Schema(
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
            required: [true, "الرجاء تحديد المقاس."],
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
      validate: {
        validator: function (arr) {
          return arr.length > 0;
        },
        message: "السلة لا يمكن أن تكون فارغة",
      },
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
    shippingAddress: {
      type: Object,
    },
    shippingCost: {
      type: Number,
      enum: [50, 0],
      min: [0, "قيمة الشحن لا يمكن أن تكون أقل من صفر"],
      default: 0,
    },
    taxes: {
      type: Number,
      min: [0, "قيمة الضريبة لا يمكن أن تكون أقل من صفر"],
    },
    expiresAt: {
      type: Date,
      default: () => new Date(Date.now() + 50 * 60 * 1000),
      expires: 0,
    },
    total_price_paid: {
      type: Number,
    },
  },
  { timestamps: true }
);

export const CachingOrder = model("CachingOrder", cachingOrderSchema);

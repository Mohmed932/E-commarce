import { model, Schema } from "mongoose";

const orderSchema = new Schema(
  {
    products: {
      type: [
        {
          product: {
            type: Schema.Types.ObjectId,
            ref: "Product",
            required: true,
          },
          quantity: {
            type: Number,
            required: [true, "يجب إضافة منتج واحد على الأقل"],
            min: [1, "الكمية يجب أن تكون واحد على الأقل"],
          },
          sizes: {
            type: [String],
          },
          colors: {
            type: [
              {
                color: {
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
              },
            ],
            required: [true, "يجب إضافة الألوان والصور."],
            validate: {
              validator: function (v) {
                return v && v.length > 0;
              },
              message: "يجب إضافة الألوان والصور.",
            },
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
    status: {
      type: String,
      enum: ["pending", "processing", "shipped", "delivered", "cancelled"],
      default: "pending",
    },
    paymentMethod: {
      type: String,
      enum: ["cash", "credit_card", "paypal", "vodafone_cash"],
      default: "cash",
    },
    isPaid: { type: Boolean, default: false },
    paidAt: Date,
    deliveredAt: Date,
    trackingNumber: String,
    notes: String,
    shippingAddress: {
      fullName: String,
      phone: String,
      addressLine: String,
      city: String,
      country: String,
      postalCode: String,
    },
  },
  { timestamps: true }
);

export const Order = model("Order", orderSchema);

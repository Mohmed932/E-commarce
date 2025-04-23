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
    shippingAddress: {
      type: [
        {
          governorate: {
            type: String,
            required: [true, "المحافظة مطلوبة"],
          },
          center: {
            type: String,
            required: [true, "المركز مطلوب"],
          },
          landmark: {
            type: String,
            required: [true, "المعلم مطلوب"],
          },
          fullName: {
            type: String,
            required: [true, "يجب ادخال الاسم كامل"],
          },
          primaryPhone: {
            type: String,
            match: [/^\+?[0-9]{10,15}$/, "رقم الهاتف غير صالح"],
            required: [true, "رقم الهاتف مطلوب"],
          },
          extraPhone: {
            type: String,
            match: [/^\+?[0-9]{10,15}$/, "رقم الهاتف غير صالح"],
          },
        },
      ],
      validate: {
        validator: function (value) {
          if (value && value.length > 0) {
            return value.every(
              (address) =>
                address.governorate &&
                address.center &&
                address.fullName &&
                address.landmark &&
                address.primaryPhone // تأكد من أن يكون `primaryPhone` بدلاً من `phone`
            );
          }
          return true;
        },
        message:
          "جميع حقول العنوان (المحافظة، المركز، القرية، المعلم، ورقم الهاتف) مطلوبة عند إضافة عنوان",
      },
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
      default: () => new Date(Date.now() + 5 * 60 * 100),
      expires: 0,
    },
  },
  { timestamps: true }
);

export const CachingOrder = model("CachingOrder", cachingOrderSchema);

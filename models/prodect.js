import { Schema, model } from "mongoose";

const productSchema = new Schema({
  title: {
    type: String,
    required: [true, "العنوان مطلوب "],
    minlength: [3, "يجب أن يكون العنوان أقل من 3 حروف"],
    maxlength: [150, "يجب أن يكون العنوان أقل من 150 حرفا "],
  },
  price: {
    type: Number,
    min: [1, "السعر يجب أن يكون أكبر من صفر"],
  },
  discount: {
    type: Number,
    min: [1, "الخصم يجب أن يكون أكبر من  صفر"],
    max: [100, "الخصم لا يمكن أن يتجاوز 100%"],
  },
  finalPrice: {
    type: Number,
    required: true,
    default: function () {
      if (this.discount > 0) {
        return this.price - (this.price * this.discount) / 100;
      }
      return this.price;
    },
  },
  colors: {
    type: [
      {
        color: { type: String, required: [true, "الرجاء تحديد اللون."] },
        images: {
          type: [
            {
              img: { type: String, required: [true, "الرجاء إضافة صورة."] },
              idOfImage: { type: String },
            },
          ],
          required: [true, "الرجاء إضافة صور للمنتج."],
        },
      },
    ],
    required: [true, "يجب إضافة الألوان والصور."],
  },
  sizes: {
    type: [String],
  },
  brand: {
    type: String,
  },
  specifications: [
    {
      key: { type: String, required: true },
      value: { type: String, required: true },
    },
  ],
  overview: [
    {
      key: { type: String, required: true },
      value: { type: [String], required: true },
    },
  ],
  category: {
    type: String, 
    required: [true, "نوع المنتج مطلوب"]
  },
});

// نحدد عملية حساب السعر النهائي قبل حفظ المنتج
productSchema.pre("save", function (next) {
  if (this.discount > 0) {
    this.finalPrice = this.price - (this.price * this.discount) / 100;
  } else {
    this.finalPrice = this.price;
  }
  next();
});

export const Product = model("Product", productSchema);

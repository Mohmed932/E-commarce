import { Schema, model } from "mongoose";

const productSchema = new Schema({
  title: {
    type: String,
    required: [true, "العنوان مطلوب "],
    minlength: [3, "يجب أن يكون العنوان أكبر من 3 حروف"],
    maxlength: [150, "يجب أن يكون العنوان أقل من 150 حرفاً "],
  },
  discount: {
    type: Number,
    min: [0, "الخصم يجب أن لا يكون اقل من صفر"],
    max: [100, "الخصم لا يمكن أن يتجاوز 100%"],
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: "Category",
    required: [true, "يجب إدخال فئة المنتج"],
  },
  subCategory: {
    type: String,
    required: [true, "يجب إدخال فئة المنتج"],
  },
  average_rate: {
    type: Number,
  },
  colorsSizePrice: {
    type: [
      {
        colorName: { type: String, required: [true, "الرجاء تحديد اللون."] },
        images: {
          type: [
            {
              img: { type: String, required: [true, "الرجاء إضافة صورة."] },
              idOfImage: { type: String },
            },
          ],
          required: [true, "الرجاء إضافة صور للمنتج."],
        },
        sizesAndPrices: {
          type: [
            {
              size: { type: String, required: [true, "الرجاء تحديد المقاس."] },
              quantity: {
                type: Number,
                required: [true, "الكمية مطلوبة"],
                min: [0, "الكمية يجب أن لا تكون اقل من صفر"],
              },
              price: {
                type: Number,
                required: [true, "الكمية مطلوبة"],
                min: [1, "الكمية يجب أن تكون أكبر من صفر"],
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
              available: {
                type: Boolean,
                default: function () {
                  return this.quantity > 0;
                },
              },
            }
          ]
        }
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
  ]
});


productSchema.index({ title: "text" });

productSchema.pre("save", function (next) {
  this.colorsSizePrice.forEach(colorSizePrice => {
    colorSizePrice.sizesAndPrices.forEach(sizePrice => {
      if (this.discount > 0) {
        sizePrice.finalPrice = sizePrice.price - (sizePrice.price * this.discount) / 100;
      } else {
        sizePrice.finalPrice = sizePrice.price;
      }

      sizePrice.available = sizePrice.quantity > 0;
    });
  });

  next();
});


export const Product = model("Product", productSchema);

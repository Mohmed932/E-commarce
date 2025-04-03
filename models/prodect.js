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
    min: [0, 'السعر يجب أن يكون أكبر من أو يساوي صفر'],
  },
  discount: {
    type: Number,
    min: [0, 'الخصم يجب أن يكون أكبر من أو يساوي صفر'],
    max: [100, 'الخصم لا يمكن أن يتجاوز 100%'],
  },
  colors: [
    {
      color: { type: String, required: true },
      images: {
        type: [
          {
            img: { type: String, required: true },
            idOfImage: { type: String },  // أو يمكن أن يكون ObjectId هنا
          },
        ],
        required: true,
      },
    },
  ],
});

export const Product = model("Product", productSchema);

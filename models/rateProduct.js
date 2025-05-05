import { Schema, model } from "mongoose";

const rateProductSchema = new Schema({
  product_id: {
    type: Schema.Types.ObjectId,
    ref: "Product",
    required: [true, "يجب اضافه رقم المنتج"],
  },
  rating: [
    {
      user_id: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: [true, "يجب اضافه رقم المستخدم"],
      },
      rate: {
        type: Number,
        enum: [1, 2, 3, 4, 5],
        required: [true, "يجب اختيار رقم من 1 الي 5"],
      },
      comment: {
        type: String,
        minlength: [5, "يجب ان يكون التعليق علي الاقل 5 احرف"],
        maxlength: [500, "يجب ان لا يتعدي عدد الاحرف 500 حرف"],
      },
    },
  ],
});

export const RateProduct = model("RateProduct", rateProductSchema);

import { Schema, model } from "mongoose";

const subCategory = new Schema({
  name: {
    type: String,
    required: [true, "هذا التصنيف مطلوب"],
    minlength: [3, "يجب أن يكون الاسم على الأقل 3 حروف"],
    maxlength: [50, "يجب أن يكون الاسم على الأقل 50 حرفا"],
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: "Category",
    required: true,
    autopopulate: true,
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  image: {
    img: {
      type: String,
      default: "https://example.com/default.jpg",
    },
    idOfImage: {
      type: String,
      default: null,
    },
  },
});

export const SubCategory = model("SubCategory", subCategory);

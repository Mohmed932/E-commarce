import { Schema, model } from "mongoose";

const categorySchema = new Schema({
  name: {
    type: String,
    required: [true, "هذا التصنيف مطلوب"],
    minlength: [3, "يجب أن يكون الاسم على الأقل 3 حروف"],
    maxlength: [50, "يجب أن يكون الاسم على الأقل 50 حرفا"],
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

export const Category = model("Category", categorySchema);

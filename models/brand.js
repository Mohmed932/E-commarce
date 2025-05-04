import { Schema, model } from "mongoose";

const brandSchema = new Schema({
  name: {
    type: String,
    required: [true, "يجب اضافه اسم للبراند"],
    minlength: [3, "يجب أن يكون الاسم على الأقل 3 حروف"],
    maxlength: [50, "يجب أن يكون الاسم على الأقل 50 حرفا"],
  },
  image: {
    type: Object,
    default: {
      img: "https://th.bing.com/th/id/OIP.Zvs5IHgOO5kip7A32UwZJgHaHa?rs=1&pid=ImgDetMain",
      idOfImage: null,
    },
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

export const Brand = model("Brand", brandSchema);

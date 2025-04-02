import { Schema, model } from "mongoose";

const brandSchema = new Schema({
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
    autopopulate: true,
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

export const Brand = model("Brand", brandSchema);

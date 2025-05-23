import e from "express"
import { Schema, model } from "mongoose"

const wishlistSchema = new Schema({
    userId: {
        type: String,
        required: [true, "يجب اضافه معرف المستخدم"],
        ref: "User"
    },
    products: [
        {
            productId: {
                type: String,
                required: [true, "يجب اضافه معرف المنتج"],
                ref: "Product"
            }
        }
    ]
}, {
    timestamps: true
});

export const WishList = model("WishList", wishlistSchema);
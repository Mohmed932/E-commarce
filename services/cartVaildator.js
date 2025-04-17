import Joi from "joi";
import mongoose from "mongoose";

export const cartValidation = Joi.object({
  product_id: Joi.string()
    .custom((value, helpers) => {
      if (!mongoose.Types.ObjectId.isValid(value)) {
        return helpers.error("any.invalid");
      }
      return value;
    }, "ObjectId validation")
    .required(),
  quantity: Joi.number().min(1).required().messages({
    "number.base": "الكمية يجب أن تكون رقم",
    "number.min": "الكمية يجب أن تكون واحد على الأقل",
    "any.required": "يجب إضافة منتج واحد على الأقل",
  }),
  sizes: Joi.array().items(Joi.string()).optional(),
  colors: Joi.array()
    .items(
      Joi.object({
        color: Joi.string().required().messages({
          "any.required": "الرجاء تحديد اللون.",
        }),
        images: Joi.array()
          .items(
            Joi.object({
              img: Joi.string().required().messages({
                "any.required": "الرجاء إضافة صورة.",
              }),
              idOfImage: Joi.string().optional(),
            })
          )
          .min(1)
          .required()
          .messages({
            "array.min": "الرجاء إضافة صور للمنتج.",
            "any.required": "الرجاء إضافة صور للمنتج.",
          }),
      })
    )
    .min(1)
    .required()
    .messages({
      "array.min": "يجب إضافة الألوان والصور.",
      "any.required": "يجب إضافة الألوان والصور.",
    }),
});

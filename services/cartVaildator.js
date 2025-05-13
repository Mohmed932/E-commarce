import Joi from "joi";
import mongoose from "mongoose";

export const cartValidation = Joi.object({
  product_id: Joi.string()
    .custom((value, helpers) => {
      if (!mongoose.Types.ObjectId.isValid(value)) {
        return helpers.error("any.invalid", { message: "الـمعرف المنتج غير صالح" });
      }
      return value;
    }, "ObjectId validation")
    .required()
    .messages({
      "any.required": "يجب تحديد معرّف المنتج.",
      "any.invalid": "الـمعرف المنتج غير صالح",
    }),

  colorsSizePrice: Joi.object({
    colorName: Joi.string().required().messages({
      "any.required": "الرجاء تحديد اللون.",
    }),

    sizesAndPrices: Joi.object({
      size: Joi.string().required().messages({
        "any.required": "الرجاء تحديد المقاس.",
      }),
      quantity: Joi.number().required().messages({
        "any.required": "الرجاء تحديد الكمية.",
      }),
    }).required().messages({
      "any.required": "الرجاء تحديد تفاصيل الحجم والسعر.",
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
  }).required().messages({
    "any.required": "يجب تحديد اللون والمقاس والسعر والصور.",
  }),
});

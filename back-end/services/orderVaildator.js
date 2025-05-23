import Joi from "joi";

// سكيمة الفاليديشن
const orderValidatorSchema = Joi.object({
  productsData: Joi.array()
    .items(
      Joi.object({
        product_id: Joi.string().required().messages({
          "string.base": "معرف المنتج يجب أن يكون نصًا.",
          "any.required": "معرف المنتج مطلوب.",
        }),
        quantity: Joi.number().required().min(1).messages({
          "number.base": "الكمية يجب أن تكون رقمًا.",
          "number.min": "الكمية يجب أن تكون واحد على الأقل.",
          "any.required": "يجب إضافة منتج واحد على الأقل.",
        }),
        size: Joi.string().required().messages({
          "string.base": "المقاس يجب أن يكون نصًا.",
          "any.required": "الرجاء تحديد المقاس.",
        }),
        images: Joi.array()
          .items(
            Joi.object({
              img: Joi.string().required().messages({
                "string.base": "الصورة يجب أن تكون نصًا.",
                "any.required": "الرجاء إضافة صورة.",
              }),
              idOfImage: Joi.string().optional().messages({
                "string.base": "معرف الصورة يجب أن يكون نصًا.",
              }),
            })
          )
          .required()
          .min(1)
          .messages({
            "array.base": "الصور يجب أن تكون مصفوفة.",
            "array.min": "يجب إضافة صورة واحدة على الأقل.",
            "any.required": "الرجاء إضافة صور للمنتج.",
          }),
        colorName: Joi.string().required().messages({
          "string.base": "اللون يجب أن يكون نصًا.",
          "any.required": "الرجاء تحديد اللون.",
        }),
      })
    )
    .required()
    .min(1)
    .messages({
      "array.base": "المنتجات يجب أن تكون مصفوفة.",
      "array.min": "يجب إضافة منتج واحد على الأقل.",
      "any.required": "يجب أن يكون هناك منتجات.",
    }),

  paymentMethod: Joi.string().valid("cash", "credit_card").optional().messages({
    "string.base": "طريقة الدفع يجب أن تكون نصًا.",
  }),
});

// فانكشن الفاليديشن
export const orderValidator = (orderData) => {
  return orderValidatorSchema.validate(orderData, { abortEarly: false });
};

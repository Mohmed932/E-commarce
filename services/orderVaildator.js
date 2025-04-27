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
        sizes: Joi.array().items(Joi.string()).optional().messages({
          "array.base": "الأحجام يجب أن تكون مصفوفة من النصوص.",
        }),
        price: Joi.number().required().min(0).messages({
          "number.base": "السعر يجب أن يكون رقمًا.",
          "number.min": "السعر لا يمكن أن يكون بالسالب.",
          "any.required": "يجب تحديد السعر.",
        }),
        colors: Joi.array()
          .items(
            Joi.object({
              color: Joi.string().required().messages({
                "string.base": "اللون يجب أن يكون نصًا.",
                "any.required": "الرجاء تحديد اللون.",
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
            })
          )
          .required()
          .min(1)
          .messages({
            "array.base": "الألوان يجب أن تكون مصفوفة.",
            "array.min": "يجب إضافة لون واحد على الأقل.",
            "any.required": "يجب إضافة الألوان والصور.",
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

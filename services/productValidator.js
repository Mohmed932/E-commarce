import Joi from "joi";

const colorSchema = Joi.object({
  color: Joi.string().required().messages({
    "any.required": "الرجاء تحديد اللون.",
  }),
  images: Joi.array()
    .items(
      Joi.object({
        img: Joi.string().required().messages({
          "any.required": "الرجاء إضافة صورة.",
        }),
        idOfImage: Joi.string(),
      })
    )
    .required()
    .messages({
      "any.required": "الرجاء إضافة صور للمنتج.",
    }),
});

const productValidationSchema = Joi.object({
  title: Joi.string()
    .min(3)
    .max(150)
    .required()
    .messages({
      "string.base": "العنوان يجب أن يكون نصًا",
      "string.min": "يجب أن يكون العنوان أكثر من 3 حروف",
      "string.max": "يجب أن يكون العنوان أقل من 150 حرفًا",
      "any.required": "العنوان مطلوب",
    }),
  
  price: Joi.number()
    .min(1)
    .required()
    .messages({
      "number.base": "السعر يجب أن يكون رقمًا",
      "number.min": "السعر يجب أن يكون أكبر من صفر",
      "any.required": "يجب إضافة سعر للمنتج",
    }),
  
  discount: Joi.number()
    .min(1)
    .max(100)
    .optional()
    .messages({
      "number.base": "الخصم يجب أن يكون رقمًا",
      "number.min": "الخصم يجب أن يكون أكبر من صفر",
      "number.max": "الخصم لا يمكن أن يتجاوز 100%",
    }),

  finalPrice: Joi.number().optional(),

  colors: Joi.array()
  .items(colorSchema)
  .min(1)
  .required()
  .messages({
    "any.required": "يجب إضافة الألوان والصور.",
    "array.min": "يجب إضافة الألوان والصور.",
  }),

  sizes: Joi.array()
    .items(Joi.string())
    .optional(),

  brand: Joi.string().optional(),

  specifications: Joi.array()
    .items(
      Joi.object({
        key: Joi.string().required().messages({
          "any.required": "المفتاح مطلوب في المواصفات",
        }),
        value: Joi.string().required().messages({
          "any.required": "القيمة مطلوبة في المواصفات",
        }),
      })
    )
    .optional(),

  overview: Joi.array()
    .items(
      Joi.object({
        key: Joi.string().required().messages({
          "any.required": "المفتاح مطلوب في نظرة عامة",
        }),
        value: Joi.array().items(Joi.string()).required().messages({
          "any.required": "القيمة مطلوبة في نظرة عامة",
        }),
      })
    )
    .optional(),

  quantity: Joi.number()
    .min(1)
    .required()
    .messages({
      "number.base": "الكمية يجب أن تكون رقمًا",
      "number.min": "الكمية يجب أن تكون أكبر من صفر",
      "any.required": "الكمية مطلوبة",
    }),

  available: Joi.boolean().optional(),
});
export const validateProduct = (productData) => {
  return productValidationSchema.validate(productData, { abortEarly: false });
};

import Joi from "joi";

const productValidationSchema = Joi.object({
  title: Joi.string().min(3).max(150).required().messages({
    "string.base": "العنوان يجب أن يكون نصًا",
    "string.min": "يجب أن يكون العنوان أكثر من 3 حروف",
    "string.max": "يجب أن يكون العنوان أقل من 150 حرفًا",
    "any.required": "العنوان مطلوب",
  }),
  category: Joi.string().min(3).max(40).required().messages({
    "string.base": "فئه الممنتج يجب أن يكون نصًا",
    "string.min": "يجب أن يكون فئه الممنتج أكثر من 3 حروف",
    "string.max": "يجب أن يكون فئه الممنتج أقل من 40 حرفًا",
    "any.required": "فئه الممنتج مطلوب",
  }),

  price: Joi.number().min(1).required().messages({
    "number.base": "السعر يجب أن يكون رقمًا",
    "number.min": "السعر يجب أن يكون أكبر من صفر",
    "any.required": "يجب إضافة سعر للمنتج",
  }),

  discount: Joi.number().min(1).max(100).optional().messages({
    "number.base": "الخصم يجب أن يكون رقمًا",
    "number.min": "الخصم يجب أن يكون أكبر من صفر",
    "number.max": "الخصم لا يمكن أن يتجاوز 100%",
  }),
  colors: Joi.array().required().messages({
    "any.required": "الرجاء تحديد اللون.",
  }),
  sizes: Joi.array().items(Joi.string()).optional(),

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

  quantity: Joi.number().min(1).required().messages({
    "number.base": "الكمية يجب أن تكون رقمًا",
    "number.min": "الكمية يجب أن تكون أكبر من صفر",
    "any.required": "الكمية مطلوبة",
  }),
});
export const validateProduct = (productData) => {
  return productValidationSchema.validate(productData, { abortEarly: false });
};

const updateproductValidationSchema = Joi.object({
  title: Joi.string().min(3).max(150).required().messages({
    "string.base": "العنوان يجب أن يكون نصًا",
    "string.min": "يجب أن يكون العنوان أكثر من 3 حروف",
    "string.max": "يجب أن يكون العنوان أقل من 150 حرفًا",
    "any.required": "العنوان مطلوب",
  }),
  category: Joi.string().min(3).max(40).required().messages({
    "string.base": "فئه الممنتج يجب أن يكون نصًا",
    "string.min": "يجب أن يكون فئه الممنتج أكثر من 3 حروف",
    "string.max": "يجب أن يكون فئه الممنتج أقل من 40 حرفًا",
    "any.required": "فئه الممنتج مطلوب",
  }),
  price: Joi.number().min(1).required().messages({
    "number.base": "السعر يجب أن يكون رقمًا",
    "number.min": "السعر يجب أن يكون أكبر من صفر",
    "any.required": "يجب إضافة سعر للمنتج",
  }),

  discount: Joi.number().min(1).max(100).optional().messages({
    "number.base": "الخصم يجب أن يكون رقمًا",
    "number.min": "الخصم يجب أن يكون أكبر من صفر",
    "number.max": "الخصم لا يمكن أن يتجاوز 100%",
  }),
  sizes: Joi.array().items(Joi.string()).optional(),

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

  quantity: Joi.number().min(1).required().messages({
    "number.base": "الكمية يجب أن تكون رقمًا",
    "number.min": "الكمية يجب أن تكون أكبر من صفر",
    "any.required": "الكمية مطلوبة",
  }),
});

export const updateValidateProduct = (data) => {
  return updateproductValidationSchema.validate(data, { abortEarly: false });
};

const addImagesProductValidationSchema = Joi.object({
  colors: Joi.array().required().messages({
    "any.required": "الرجاء تحديد اللون.",
  }),
});

export const addImagesValidateProduct = (colors) => {
  return addImagesProductValidationSchema.validate(colors, {
    abortEarly: false,
  });
};

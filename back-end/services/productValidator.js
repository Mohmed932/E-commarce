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
  subCategory: Joi.string().min(3).max(40).required().messages({
    "string.base": "فئه الممنتج يجب أن يكون نصًا",
    "string.min": "يجب أن يكون فئه الممنتج أكثر من 3 حروف",
    "string.max": "يجب أن يكون فئه الممنتج أقل من 40 حرفًا",
    "any.required": "فئه الممنتج مطلوب",
  }),
  discount: Joi.number().min(1).max(100).optional().messages({
    "number.base": "الخصم يجب أن يكون رقمًا",
    "number.min": "الخصم يجب أن يكون أكبر من صفر",
    "number.max": "الخصم لا يمكن أن يتجاوز 100%",
  }),
  colorsSizePrice: Joi.array().items(
    Joi.object({
      colorName: Joi.string().required().messages({
        "any.required": "الرجاء تحديد اللون.",
      }),
      sizesAndPrices: Joi.array()
        .items(
          Joi.object({
            size: Joi.string().required().messages({
              "any.required": "الرجاء تحديد المقاس.",
            }),
            quantity: Joi.number().min(1).required().messages({
              "number.base": "الكمية يجب أن تكون رقمًا",
              "number.min": "الكمية يجب أن تكون أكبر من صفر",
              "any.required": "الكمية مطلوبة",
            }),
            price: Joi.number().min(1).required().messages({
              "number.base": "السعر يجب أن يكون رقمًا",
              "number.min": "السعر يجب أن يكون أكبر من صفر",
              "any.required": "يجب إضافة سعر للمنتج",
            }),
          })
        )
        .required()
        .messages({
          "any.required": "الرجاء تحديد المقاسات.",
        }),
    })
  ).required().messages({
    "any.required": "الرجاء تحديد اللون.",
  }),

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

  discount: Joi.number().min(0).max(70).optional().messages({
    "number.base": "الخصم يجب أن يكون رقمًا",
    "number.min": "الخصم يجب أن لا يكون اقل من صفر",
    "number.max": "الخصم لا يمكن أن يتجاوز 70%",
  }),

  brand: Joi.string().optional(),
  colorsSizePrice: Joi.array().items(
    Joi.object({
      colorName: Joi.string().required().messages({
        "any.required": "الرجاء تحديد اللون.",
      }),
      _id: Joi.string().required().messages({
        "any.required": "الرجاء تحديد رقم المنتج.",
      }),
      sizesAndPrices: Joi.array()
        .items(
          Joi.object({
            size: Joi.string().required().messages({
              "any.required": "الرجاء تحديد المقاس.",
            }),
            quantity: Joi.number().min(1).required().messages({
              "number.base": "الكمية يجب أن تكون رقمًا",
              "number.min": "الكمية يجب أن تكون أكبر من صفر",
              "any.required": "الكمية مطلوبة",
            }),
            price: Joi.number().min(1).required().messages({
              "number.base": "السعر يجب أن يكون رقمًا",
              "number.min": "السعر يجب أن يكون أكبر من صفر",
              "any.required": "يجب إضافة سعر للمنتج",
            }),
            _id: Joi.string().optional().messages({
              "any.required": "الرجاء تحديد رقم المنتج.",
            }),
          })
        )
        .required()
        .messages({
          "any.required": "الرجاء تحديد المقاسات.",
        }),
    })
  ).required().messages({
    "any.required": "الرجاء تحديد اللون.",
  }),
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
});

export const updateValidateProduct = (data) => {
  return updateproductValidationSchema.validate(data, { abortEarly: false });
};

const addImagesProductValidationSchema = Joi.string().required().messages({
  "any.required": "الرجاء تحديد اللون.",
  "string.base": "اللون يجب أن يكون نصاً.",
  "string.empty": "الرجاء عدم ترك اللون فارغاً.",
})
export const addImagesValidateProduct = (colors) => {
  return addImagesProductValidationSchema.validate(colors, {
    abortEarly: false,
  });
};

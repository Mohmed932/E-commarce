import Joi from "joi";

export const addRateProductVaildator = Joi.object({
  rate: Joi.number().required().min(1).max(5).messages({
    "any.required": "التقييم مطلوب.",
    "number.base": "يجب أن يكون التقييم رقمًا.",
    "number.min": "أقل تقييم يمكن إدخاله هو 1.",
    "number.max": "أعلى تقييم يمكن إدخاله هو 5.",
  }),

  comment: Joi.string().optional().min(5).max(500).messages({
    "string.base": "يجب أن يكون التعليق نصًا.",
    "string.min": "يجب أن يحتوي التعليق على 5 أحرف على الأقل.",
    "string.max": "يجب ألا يتجاوز التعليق 500 حرف.",
  }),
});

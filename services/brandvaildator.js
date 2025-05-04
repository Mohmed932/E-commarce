import Joi from "joi";

export const brandvaildatorSchema = Joi.object({
  name: Joi.string().required().min(3).max(50).messages({
    "string.base": "اسم الماركة يجب أن يكون نصًا.",
    "string.empty": "اسم الماركة مطلوب.",
    "string.min": "اسم الماركة يجب أن يحتوي على 3 أحرف على الأقل.",
    "string.max": "اسم الماركة يجب ألا يتجاوز 50 حرفًا.",
    "any.required": "اسم الماركة مطلوب.",
  }),
});

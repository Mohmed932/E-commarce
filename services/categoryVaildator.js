import Joi from "joi";

export const categoryVaildator = Joi.object({
  name: Joi.string().min(3).max(20).required().messages({
    "any.required": " الاسم مطلوب",
    "string.min": " الاسم يجب أن يكون على الأقل 3 حروف",
    "string.max": " الاسم يجب أن لا يتجاوز 20 حرفًا",
  }),
});

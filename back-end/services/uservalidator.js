import Joi from "joi";

export const signUpVaildator = Joi.object({
  name: Joi.string().min(3).max(20).required().messages({
    "any.required": "اسم المستخدم مطلوب",
    "string.min": "اسم المستخدم يجب أن يكون على الأقل 3 حروف",
    "string.max": "اسم المستخدم يجب أن لا يتجاوز 20 حرفًا",
  }),

  email: Joi.string()
    .pattern(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/)
    .required()
    .messages({
      "any.required": "البريد الإلكتروني مطلوب",
      "string.pattern.base": "البريد الإلكتروني غير صالح",
    }),

  username: Joi.string().min(3).max(20).required().messages({
    "any.required": "اسم المستخدم مطلوب",
    "string.min": "اسم المستخدم يجب أن يكون على الأقل 3 حروف",
    "string.max": "اسم المستخدم يجب أن لا يتجاوز 20 حرفًا",
  }),

  password: Joi.string().min(3).max(20).required().messages({
    "any.required": "كلمة المرور مطلوبة",
    "string.min": "كلمة المرور يجب أن تكون على الأقل 3 حروف",
  }),
});

export const loginVaildator = Joi.object({
  email: Joi.string()
    .pattern(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/)
    .required()
    .messages({
      "any.required": "البريد الإلكتروني مطلوب",
      "string.pattern.base": "البريد الإلكتروني غير صالح",
    }),
  password: Joi.string().min(3).max(20).required().messages({
    "any.required": "كلمة المرور مطلوبة",
    "string.min": "كلمة المرور يجب أن تكون على الأقل 3 حروف",
  }),
});

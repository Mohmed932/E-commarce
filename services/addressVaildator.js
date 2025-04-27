import Joi from "joi";

const addressVaildatorSchame = Joi.object({
  governorate: Joi.string().required().messages({
    "string.base": "المحافظة يجب أن تكون نصًا.",
    "any.required": "المحافظة مطلوبة.",
  }),
  center: Joi.string().required().messages({
    "string.base": "المركز يجب أن يكون نصًا.",
    "any.required": "المركز مطلوب.",
  }),
  landmark: Joi.string().required().messages({
    "string.base": "العلامة المميزة يجب أن تكون نصًا.",
    "any.required": "العلامة المميزة مطلوبة.",
  }),
  fullName: Joi.string().required().messages({
    "string.base": "الاسم الكامل يجب أن يكون نصًا.",
    "any.required": "الاسم الكامل مطلوب.",
  }),
  primaryPhone: Joi.string().required().messages({
    "string.base": "رقم الهاتف الأساسي يجب أن يكون نصًا.",
    "any.required": "رقم الهاتف الأساسي مطلوب.",
  }),
  extraPhone: Joi.string().optional().messages({
    "string.base": "رقم الهاتف الإضافي يجب أن يكون نصًا.",
  }),
});

export const addressVaildator = (data) => {
  return addressVaildatorSchame.validate(data, { abortEarly: false });
};

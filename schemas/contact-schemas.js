import Joi from "joi";

export const contactAddSchema = Joi.object({
  name: Joi.string()
    .min(2) // Минимальная длина имени
    .max(50) // Максимальная длина имени
    .required()
    .messages({
      "string.min": `The "name" must contain a minimum of {#limit} characters`,
      "string.max": `The "name" must contain a maximum of {#limit} characters`,
      "any.required": `"name" required field`,
    }),

  email: Joi.string()
    .email() // Проверка на валидный email
    .required()
    .messages({
      "string.email": `The "email" must be a valid email address`,
      "any.required": `"email" required field`,
    }),

  phone: Joi.string()
    .regex(/^\(\d{3}\) \d{3}-\d{4}$/) // Проверка на формат номера телефона (например, 1234567890)
    .required()
    .messages({
      "string.email": `The "phone" must correspond to the format (111) 111-1111`,
      "any.required": `"phone" required field`,
    }),
});

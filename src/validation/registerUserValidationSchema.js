import Joi from 'joi';

export const registerUserValidationSchema = Joi.object({
  name: Joi.string().required().min(3).max(20),
  email: Joi.string().required().email().min(3).max(20),
  password: Joi.string().required(),
});

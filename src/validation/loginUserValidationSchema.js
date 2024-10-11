import Joi from 'joi';

export const loginUserValidationSchema = Joi.object({
  email: Joi.string().required().email().min(3).max(20),
  password: Joi.string().required(),
});

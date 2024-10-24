import Joi from 'joi';

export const sendResetSchemaValidation = Joi.object({
  email: Joi.string().required().email(),
});

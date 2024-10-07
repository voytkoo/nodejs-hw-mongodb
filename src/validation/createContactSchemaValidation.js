import Joi from 'joi';

export const createContactSchemaValidation = Joi.object({
  name: Joi.string().required().min(3).max(20),
  phoneNumber: Joi.number().required(),
  email: Joi.string().email().min(3).max(20),
  isFavourite: Joi.boolean().default(false),
  contactType: Joi.string()
    .valid('work', 'home', 'personal')
    .min(3)
    .max(20)
    .default('personal')
    .required(),
});

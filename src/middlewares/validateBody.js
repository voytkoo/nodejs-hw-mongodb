import createHttpError from 'http-errors';

export const validateBody = (schema) => (req, res, next) => {
  try {
    schema.validate(req.body, {
      abortEarly: false,
    });
    next();
  } catch (err) {
    const error = createHttpError(400, 'Bad request', {
      errors: err.details,
    });
    next(error);
  }
};
